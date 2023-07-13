const { ethers } = require('hardhat');

const DECIMALS = 6;

const parseUINT = uint => Number(ethers.utils.formatUnits(uint, DECIMALS));

const getBalance = async (token, address) => {
    const expandedBalance = await token.balanceOf(address);
    return parseUINT(expandedBalance);
};

const log = (...args) => {
    console.log('   ->', ...args);
};

const THREE_DAYS = 60 * 60 * 24 * 3;

const createProposal = async (token, text) =>
    token.createProposal(
        ethers.utils.keccak256(ethers.utils.toUtf8Bytes(text))
    );

module.exports = { log, getBalance, THREE_DAYS, createProposal };
