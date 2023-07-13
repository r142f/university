const express = require('express');
const Busboy = require('busboy');
const ethers = require('ethers');

const configuration = require('../configuration.json');
const ABI = require('./abi.json').abi;
const genesis = require('../genesis.json');

const provider = new ethers.providers.JsonRpcProvider(
  configuration.ethereum_node_address
);
const deployer = provider.getSigner(Object.keys(genesis.alloc)[0]);
const contract = new ethers.Contract(
  configuration.contract_address,
  ABI,
  deployer
);

const create = require('ipfs-http-client');
const client = create(configuration.ipfs_node_address);

const {
  PORT,
  htmlSetForm,
  htmlGetForm,
  setPath,
  getPath,
} = require('./utils.js');

const app = express();

app.get('/', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`<body>${htmlSetForm}<hr/>${htmlGetForm}</body>`);
  return res.end();
});

app.post(`/${setPath}`, async function (req, res) {
  const busboy = Busboy({ headers: req.headers });
  busboy.on('file', async function (_, file, _, _, _) {
    const [{ hash }] = await client.add(file);

    const tx = await contract.setHash(hash);
    await tx.wait();
  });

  busboy.on('finish', function () {
    res.writeHead(200, { Connection: 'close' });
    res.end('File was uploaded! Mining of the block might take some time.');
  });

  return req.pipe(busboy);
});

app.get(`/${getPath}`, async function (_, res) {
  const hash = await contract.getHash();
  const buffer = await client.cat(hash);
  return res.end(buffer);
});

app.listen(PORT, () => {
  console.log(`DApp is running at http://localhost:${PORT}`);
});
