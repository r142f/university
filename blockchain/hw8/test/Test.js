const { ethers } = require('hardhat');
const { expect } = require('chai');
const genesis = require("../genesis.json");

describe('Storage', function () {
  it('Should correctly store file hashes', async function () {
    const deployer = await ethers.getSigner(Object.keys(genesis.alloc)[0]);
    const StorageFactory = await ethers.getContractFactory('Storage');
    const storage = await StorageFactory.connect(deployer).deploy();
    console.log('Contract deployed to:', storage.address);

    expect(await storage.getHash()).to.be.equal('');
    
    const hash = 'super_hash';
    const tx = await storage.setHash(hash);
    await tx.wait();

    expect(await storage.getHash()).to.be.equal(hash);
  });
});
