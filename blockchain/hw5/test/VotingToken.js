const { expect } = require('chai');
const { ethers } = require('hardhat');
const {
    loadFixture,
    time,
} = require('@nomicfoundation/hardhat-network-helpers');
const { log, getBalance, THREE_DAYS, createProposal } = require('./utils.js');

describe('VotingToken contract', function () {
    async function deployTokenFixture() {
        const TokenFactory = await ethers.getContractFactory('VotingToken');
        const token = await TokenFactory.deploy();
        await token.deployed();

        console.log(`   deployed to: ${token.address}, supply: 100VTK`);

        const [owner, addr1, addr2] = await ethers.getSigners();

        return { token, owner, addr1, addr2 };
    }

    it('Should implement user story from the task', async function () {
        const {
            token,
            owner: A,
            addr1: B,
            addr2: C,
        } = await loadFixture(deployTokenFixture);
        await token.transfer(B.address, 40 * 1e6);
        await token.transfer(C.address, 35 * 1e6);

        for (const { address, name } of [
            { ...A, name: 'A' },
            { ...B, name: 'B' },
            { ...C, name: 'C' },
        ]) {
            log(`Balance of ${name}: ${await getBalance(token, address)}`);
        }

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );

        await token.createProposal(proposalHash);
        log(`A created proposal with text "${proposalText}"`);

        await token.voteFor(proposalHash);
        log(`A voted for proposal`);

        log("B's voting for proposal");
        expect(await token.connect(B).voteFor(proposalHash))
            .to.emit(token, 'ProposalAccepted')
            .withArgs(proposalHash);
        log('Event "ProposalAccepted" was emitted');
        expect((await token.getProposalQueue()).length).to.equal(0);
        log(`Contract's proposal queue is empty`);
    });

    it('Should not accept proposal with 50% for votes', async function () {
        const {
            token,
            owner: A,
            addr1: B,
        } = await loadFixture(deployTokenFixture);
        await token.transfer(B.address, 50 * 1e6);

        for (const { address, name } of [
            { ...A, name: 'A' },
            { ...B, name: 'B' },
        ]) {
            log(`Balance of ${name}: ${await getBalance(token, address)}`);
        }

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );
        await token.createProposal(proposalHash);
        log(`A created proposal with text "${proposalText}"`);

        log(
            `A's voting for proposal now. We don't expect proposal to be accepted`
        );
        expect(await token.voteFor(proposalHash)).not.to.emit(
            token,
            'ProposalAccepted'
        );
        log(
            `B's voting against proposal now. We don't expect proposal to be rejected`
        );
        expect(await token.connect(B).voteAgainst(proposalHash)).not.to.emit(
            token,
            'ProposalAccepted'
        );
        expect((await token.getProposalQueue()).length).to.equal(1);
    });

    it('Has maximum 3 current proposals, new proposals cannot be added until old ones will be “accepted”, “declined” or “discarded” by TTL', async function () {
        const { token, owner: A } = await loadFixture(deployTokenFixture);

        for (const text of ['1', '2', '3']) {
            const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(text));
            await token.createProposal(hash);
        }
        expect((await token.getProposalQueue()).length).to.equal(3);
        log(`Created 3 proposals`);

        await expect(
            token.createProposal(
                ethers.utils.keccak256(ethers.utils.toUtf8Bytes('0'))
            )
        ).to.be.revertedWith('VotingToken: no place for new proposal!');
        log(`Couldn't create 4th proposal`);

        for (const { address, name } of [{ ...A, name: 'A' }]) {
            log(`Balance of ${name}: ${await getBalance(token, address)}`);
        }

        log(`A's voting for the first proposal now`);
        expect(
            await token.voteFor(
                ethers.utils.keccak256(ethers.utils.toUtf8Bytes('1'))
            )
        ).to.emit(token, 'ProposalAccepted');
        expect((await token.getProposalQueue()).length).to.equal(2);
        log(`First proposal's accepted, now we can create new one`);

        await expect(createProposal(token, '0')).not.to.be.reverted;
        expect((await token.getProposalQueue()).length).to.equal(3);
        log(`Created new proposal`);
    });

    it('If > 1 old proposals are obsolete, then addition of a new proposal automatically “kicks out” the most obsolete proposal, making it “discarded”', async function () {
        const { token, owner: A } = await loadFixture(deployTokenFixture);

        for (const text of ['1', '2', '3']) {
            await createProposal(token, text);
        }
        expect((await token.getProposalQueue()).length).to.equal(3);
        log(`Created 3 proposals`);

        await time.increase(THREE_DAYS);
        log(`Increased timestamp by 3 days`);

        await expect(createProposal(token, '0')).not.to.be.reverted;
        expect((await token.getProposalQueue()).length).to.equal(3);
        log(`Created new proposal; most obsolete one was kicked out`);
    });

    it('Should not “freeze” tokens when after voting', async function () {
        const {
            token,
            owner: A,
            addr1: B,
        } = await loadFixture(deployTokenFixture);

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );
        await token.createProposal(proposalHash);
        expect((await token.getProposalQueue()).length).to.equal(1);
        log(`A created proposal with text "${proposalText}"`);

        await token.transfer(B.address, 50 * 1e6);
        for (const { address, name } of [
            { ...A, name: 'A' },
            { ...B, name: 'B' },
        ]) {
            log(`Balance of ${name}: ${await getBalance(token, address)}`);
        }

        await expect(token.voteFor(proposalHash)).not.to.emit(
            token,
            'ProposalAccepted'
        );
        log(`A voted for proposal`);
        await expect(token.connect(B).voteAgainst(proposalHash)).not.to.emit(
            token,
            'ProposalAccepted'
        );
        log(`B voted against proposal`);

        const transferAmount = 10;
        const transfer = token.transfer(B.address, transferAmount * 1e6);
        await expect(transfer).to.emit(token, 'Transfer');
        await expect(transfer).not.to.emit(token, 'ProposalAccepted');
        expect((await token.getProposalQueue()).length).to.equal(0);
        log(
            `A transferred ${transferAmount}${await token.symbol()} to B after voting for proposal and proposal got declined`
        );

        for (const { address, name } of [
            { ...A, name: 'A' },
            { ...B, name: 'B' },
        ]) {
            log(`Balance of ${name}: ${await getBalance(token, address)}`);
        }
    });
});

describe('Revert cases', function () {
    async function deployTokenFixture() {
        const TokenFactory = await ethers.getContractFactory('VotingToken');
        const token = await TokenFactory.deploy();
        await token.deployed();

        console.log(`   deployed to: ${token.address}, supply: 100VTK`);

        const [owner, addr1, addr2] = await ethers.getSigners();

        return { token, owner, addr1, addr2 };
    }

    it(`"VotingToken: proposal doesn't exist!" in getProposal`, async function () {
        const { token } = await loadFixture(deployTokenFixture);

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );

        await expect(token.getProposal(proposalHash)).to.be.revertedWith(
            `VotingToken: proposal doesn't exist!`
        );
    });

    it(`"VotingToken: proposal already exists!" in createProposal`, async function () {
        const { token } = await loadFixture(deployTokenFixture);

        await createProposal(token, '0');
        expect((await token.getProposalQueue()).length).to.equal(1);

        await expect(createProposal(token, '0')).to.be.revertedWith(
            `VotingToken: proposal already exists!`
        );
    });

    it(`"VotingToken: no place for new proposal!" in createProposal`, async function () {
        const { token } = await loadFixture(deployTokenFixture);

        for (const text of ['1', '2', '3']) {
            await createProposal(token, text);
        }
        expect((await token.getProposalQueue()).length).to.equal(3);

        await expect(createProposal(token, '0')).to.be.revertedWith(
            `VotingToken: no place for new proposal!`
        );
    });

    it(`"VotingToken: proposal doesn't exist!" in voteFor`, async function () {
        const { token } = await loadFixture(deployTokenFixture);

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );

        await expect(token.voteFor(proposalHash)).to.be.revertedWith(
            `VotingToken: proposal doesn't exist!`
        );
    });

    it(`"VotingToken: proposal's obsolete!" in voteFor`, async function () {
        const { token } = await loadFixture(deployTokenFixture);

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );
        await token.createProposal(proposalHash);
        expect((await token.getProposalQueue()).length).to.equal(1);

        await time.increase(THREE_DAYS);

        await expect(token.voteFor(proposalHash)).to.be.revertedWith(
            `VotingToken: proposal's obsolete!`
        );
    });

    it(`"VotingToken: sender's already voted for!" in voteFor`, async function () {
        const { token, addr1: B } = await loadFixture(deployTokenFixture);

        await token.transfer(B.address, 50 * 1e6);

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );
        await token.createProposal(proposalHash);
        expect((await token.getProposalQueue()).length).to.equal(1);

        await token.voteFor(proposalHash);

        await expect(token.voteFor(proposalHash)).to.be.revertedWith(
            `VotingToken: sender's already voted for!`
        );
    });

    it(`"VotingToken: proposal doesn't exist!" in voteAgainst`, async function () {
        const { token } = await loadFixture(deployTokenFixture);

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );

        await expect(token.voteAgainst(proposalHash)).to.be.revertedWith(
            `VotingToken: proposal doesn't exist!`
        );
    });

    it(`"VotingToken: proposal's obsolete!" in voteAgainst`, async function () {
        const { token } = await loadFixture(deployTokenFixture);

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );
        await token.createProposal(proposalHash);
        expect((await token.getProposalQueue()).length).to.equal(1);

        await time.increase(THREE_DAYS);

        await expect(token.voteAgainst(proposalHash)).to.be.revertedWith(
            `VotingToken: proposal's obsolete!`
        );
    });

    it(`"VotingToken: sender's already voted against!" in voteAgainst`, async function () {
        const { token, addr1: B } = await loadFixture(deployTokenFixture);

        await token.transfer(B.address, 50 * 1e6);

        const proposalText = '__test proposal__';
        const proposalHash = ethers.utils.keccak256(
            ethers.utils.toUtf8Bytes(proposalText)
        );
        await token.createProposal(proposalHash);
        expect((await token.getProposalQueue()).length).to.equal(1);

        await token.voteAgainst(proposalHash);

        await expect(token.voteAgainst(proposalHash)).to.be.revertedWith(
            `VotingToken: sender's already voted against!`
        );
    });
});
