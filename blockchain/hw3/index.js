import { Network, Alchemy } from "alchemy-sdk";
import Web3 from "web3";
import { ethers } from "ethers";
import env from './env.json' assert {type: "json"};

import { proxyInterfaceABI, getTime, eventName } from "./utils.js";

const proxies = [
    { pair: " ETH/USD", address: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419" },
    { pair: "LINK/ETH", address: "0xDC530D9457755926550b59e8ECcdaE7624181557" },
    { pair: "USDT/ETH", address: "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46" },
];

const web3 = new Web3("https://rpc.ankr.com/eth");

const aggregators = await Promise.all(
    proxies.map(({ pair, address }) =>
        new web3.eth.Contract(proxyInterfaceABI, address).methods
            .aggregator()
            .call()
            .then((address) => ({ pair, address }))
    )
);

const alchemySettings = {
    apiKey: env.ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(alchemySettings);

const filters = aggregators.map(({ address }) => ({
    address,
    topics: [ethers.utils.id(eventName)],
}));

filters.forEach((filter, i) => {
    const { address, pair } = aggregators[i];

    alchemy.ws.on(
        filter,
        ({ topics: [_, current, roundId], data: updatedAt }) => {
            [current, roundId, updatedAt] = [current, roundId, updatedAt].map(
                (entry) => parseInt(entry, 16)
            );

            console.log(
                `[${getTime()}, ${pair}] current: ${current}, roundId: ${roundId}, updatedAt: ${updatedAt}`
            );
        }
    );

    console.log(
        `[${getTime()}, ${pair}] subscribed to ${eventName} event emitted by ${address} aggregator`
    );
});
