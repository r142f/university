const { ethers } = require('hardhat');
const { expect } = require('chai');
const ERC20 = require('@openzeppelin/contracts/build/contracts/ERC20.json');

const { toBytes32, setStorageAt, getBalance, log } = require('./utils');

const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const WETH_SLOT = 3;
const UniswapV3RouterAddress = '0xE592427A0AEce92De3Edee1F18E0157C05861564';

describe('Receiver contract', function () {
  it('Should perform 3 swaps using flashloan', async function () {
    const ReceiverFactory = await ethers.getContractFactory('Receiver');

    const receiver = await ReceiverFactory.deploy(UniswapV3RouterAddress);
    console.log(`   deployed to: ${receiver.address}`);

    const WETH = await ethers.getContractAt(ERC20.abi, WETH_ADDRESS);
    const index = ethers.utils.solidityKeccak256(
      ['uint256', 'uint256'],
      [receiver.address, WETH_SLOT] // key, slot
    );
    await setStorageAt(
      WETH.address,
      index.toString(),
      toBytes32(ethers.utils.parseEther('1.0'))
    );

    const wethBalanceBefore = await getBalance(WETH, receiver.address);
    log(
      `Receiver ${await WETH.name()} balance: ${wethBalanceBefore} ${await WETH.symbol()}.`
    );
    log(`Receiver is performing 3 swaps using flashloan...`);
    await receiver.myFlashLoanCall();
    const wethBalanceAfter = await getBalance(WETH, receiver.address);
    log(
      `Receiver ${await WETH.name()} balance: ${wethBalanceAfter} ${await WETH.symbol()}.`
    );
    expect(wethBalanceBefore).is.greaterThan(wethBalanceAfter);
  });
});
