require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const env = require('./env.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${env.ALCHEMY_API_KEY}`,
        blockNumber: 16021485
      }
    }
  }
};
