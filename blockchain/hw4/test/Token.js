const { expect } = require("chai");
const { ethers } = require("hardhat");
const UniswapV2RouterABI = require("../abis/IUniswapV2Router.json");
const UniswapV2RouterAddress = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

const DECIMALS = 18;
const INITIAL_SUPPLY = "100";
const ALLOWANCE = "50";
const LIQUIDITY = "25";
const TOKENS = [
    { name: "XToken", symbol: "XT", supply: INITIAL_SUPPLY },
    { name: "YToken", symbol: "YT", supply: INITIAL_SUPPLY },
];

it("Token swap should decrease amount of XToken and increase amount of YToken", async function () {
    const [owner] = await ethers.getSigners();
    const TokenFactory = await ethers.getContractFactory("Token");

    const [xToken, yToken] = await Promise.all(
        TOKENS.map(async ({ name, symbol, supply }) => {
            console.log(`  -> Deploying ${name} to the mainnet fork...`);
            const token = await TokenFactory.deploy(
                ethers.utils.parseEther(supply),
                name,
                symbol
            );
            await token.deployed();
            console.log(
                `  -> ${name} deployed to: ${token.address}, supply: ${supply}${symbol}`
            );

            return token;
        })
    );

    const uniswapV2Router = await ethers.getContractAt(
        UniswapV2RouterABI,
        UniswapV2RouterAddress
    );
    for (const token of [xToken, yToken]) {
        await token.approve(
            uniswapV2Router.address,
            ethers.utils.parseEther(ALLOWANCE)
        );
        console.log(
            `  -> Gave the router an allowance of ${ALLOWANCE}${await token.symbol()}`
        );
    }
    await uniswapV2Router.addLiquidity(
        xToken.address,
        yToken.address,
        ethers.utils.parseEther(LIQUIDITY),
        ethers.utils.parseEther(LIQUIDITY),
        1,
        1,
        owner.address,
        Math.trunc(new Date().getTime() + 31557600)
    );
    console.log(
        `  -> Added liquidity to ${await xToken.symbol()}-${await yToken.symbol()} pair, ${LIQUIDITY} tokens each`
    );

    const getBalance = async (token) => {
        const expandedBalance = await token.balanceOf(owner.address);
        return Number(ethers.utils.formatUnits(expandedBalance, DECIMALS));
    };

    const XTBalanceBefore = await getBalance(xToken);
    const YTBalanceBefore = await getBalance(yToken);
    
    console.log(
        `  -> Initial ${await xToken.name()} balance of owner: ${XTBalanceBefore}${await xToken.symbol()}`
    );
    console.log(
        `  -> Initial ${await yToken.name()} balance of owner: ${YTBalanceBefore}${await yToken.symbol()}`
    );

    const swap = await uniswapV2Router.swapExactTokensForTokens(
        ethers.utils.parseEther("10"),
        ethers.utils.parseEther("1"),
        [xToken.address, yToken.address],
        owner.address,
        Math.trunc(new Date().getTime() + 31557600)
    );
    console.log(`  -> Performing swap...`);
    swap.wait();

    const XTBalanceAfter = await getBalance(xToken);
    const YTBalanceAfter = await getBalance(yToken);

    console.log(
        `  -> New ${await xToken.name()} balance of owner: ${XTBalanceAfter}${await xToken.symbol()}`
    );
    console.log(
        `  -> New ${await yToken.name()} balance of owner: ${YTBalanceAfter}${await yToken.symbol()}`
    );

    expect(XTBalanceBefore).is.greaterThan(XTBalanceAfter);
    expect(YTBalanceAfter).is.greaterThan(YTBalanceBefore);
});
