require('@nomicfoundation/hardhat-toolbox');
const env = require('./env.json');

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.10',
   
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${env.ALCHEMY_API_KEY}`,
        blockNumber: 16021485,
      },
    },
  },
};
