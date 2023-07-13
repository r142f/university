const { ethers } = require("hardhat");
const genesis = require("../genesis.json");

async function main() {
  const deployer = await ethers.getSigner(Object.keys(genesis.alloc)[0]);

  // console.log("Deploying contract with the account:", deployer.address);
  // console.log("Account balance:", (await deployer.getBalance()).toString());

  const StorageFactory = await ethers.getContractFactory("Storage");
  const storage = await StorageFactory.connect(deployer).deploy();

  console.log("Contract address:", storage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });