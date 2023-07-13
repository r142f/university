require("@nomicfoundation/hardhat-toolbox");
const configuration = require("./configuration.json");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "local",
  networks: {
    local: {
      url: configuration.ethereum_node_address,
      chainId: 17,
    }
  },
};
