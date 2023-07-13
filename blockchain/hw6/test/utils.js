const { ethers } = require('hardhat');

const toBytes32 = bn => {
  return ethers.utils.hexlify(ethers.utils.zeroPad(bn.toHexString(), 32));
};

const setStorageAt = async (address, index, value) => {
  await ethers.provider.send('hardhat_setStorageAt', [address, index, value]);
  await ethers.provider.send('evm_mine', []);
};

const DECIMALS = 18;

const getBalance = async (token, address) => {
  const expandedBalance = await token.balanceOf(address);
  return Number(ethers.utils.formatUnits(expandedBalance, DECIMALS));
};

const log = (...args) => {
  console.log('   ->', ...args);
};

module.exports = { toBytes32, setStorageAt, getBalance, log };
