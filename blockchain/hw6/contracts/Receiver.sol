// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import {IFlashLoanReceiver} from "./@aave/IFlashLoanReceiver.sol";
import {ILendingPoolAddressesProvider} from "./@aave/ILendingPoolAddressesProvider.sol";
import {ILendingPool} from "./@aave/ILendingPool.sol";

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Receiver is IFlashLoanReceiver {
    ISwapRouter public immutable swapRouter;
    uint24 public constant poolFee = 3000;
    address public constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;
    address public constant LINK = 0x514910771AF9Ca656af840dff83E8264EcF986CA;

    ILendingPool public immutable override LENDING_POOL;
    ILendingPoolAddressesProvider public immutable override ADDRESSES_PROVIDER;
    address public constant LendingPoolAddressesProvideAddress =
        0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5;

    constructor(ISwapRouter _swapRouter) {
        swapRouter = _swapRouter;

        ADDRESSES_PROVIDER = ILendingPoolAddressesProvider(
            LendingPoolAddressesProvideAddress
        );

        LENDING_POOL = ILendingPool(
            ILendingPoolAddressesProvider(LendingPoolAddressesProvideAddress)
                .getLendingPool()
        );
    }

    function myFlashLoanCall() public {
        address receiverAddress = address(this);
        address[] memory assets = new address[](1);
        assets[0] = WETH;
        uint256[] memory amounts = new uint256[](1);
        amounts[0] = 1 ether;
        uint256[] memory modes = new uint256[](1);
        modes[0] = 0;
        address onBehalfOf = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        LENDING_POOL.flashLoan(
            receiverAddress,
            assets,
            amounts,
            modes,
            onBehalfOf,
            params,
            referralCode
        );
    }

    function executeOperation(
        address[] calldata assets,
        uint256[] calldata amounts,
        uint256[] calldata premiums,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        uint amountIn = amounts[0];

        TransferHelper.safeApprove(WETH, address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory swapParams = ISwapRouter
            .ExactInputParams({
                path: abi.encodePacked(
                    WETH,
                    poolFee,
                    LINK,
                    poolFee,
                    USDT,
                    poolFee,
                    WETH
                ),
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0
            });

        swapRouter.exactInput(swapParams);

        uint amountOwing = amounts[0] + premiums[0];
        IERC20(assets[0]).approve(address(LENDING_POOL), amountOwing);

        return true;
    }
}
