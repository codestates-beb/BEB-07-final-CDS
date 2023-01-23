const Web3 = require('web3');
const TokenABI = require('./ABIs/EWEToken.json').abi;
const NFTABI = require('./ABIs/EWENFT.json').abi;
require('dotenv').config({ path: '../.env' }); // TODO: remove later

const { NFT_CA, TOKEN_CA } = process.env;
const web3Socket = new Web3(
  new Web3.providers.WebsocketProvider('ws://20.214.190.113:8545'),
);

const web3Http = new Web3(
  new Web3.providers.HttpProvider('http://20.214.190.113:8545'),
);

const tokenContractHttp = new web3Http.eth.Contract(TokenABI, TOKEN_CA);
const nftContractHttp = new web3Http.eth.Contract(NFTABI, NFT_CA);

const tokenContract = new web3Socket.eth.Contract(TokenABI, TOKEN_CA);
const nftContract = new web3Socket.eth.Contract(NFTABI, NFT_CA);

const verifyContracts = async () => {
  const TokenName = await tokenContract.methods.name().call();
  const NFTName = await nftContract.methods.name().call();

  if (TokenName !== 'EWEToken')
    throw new Error(`Invalid Token name : ${TokenName}`);
  if (NFTName !== 'EWENFT') throw new Error(`Invalid Token name : ${NFTName}`);
  console.log('Contracts Verifed');
  return true;
};

verifyContracts();

module.exports = {
  verifyContracts,
  tokenContract,
  nftContract,
  tokenContractHttp,
  nftContractHttp,
  web3Socket,
  web3Http,
};
