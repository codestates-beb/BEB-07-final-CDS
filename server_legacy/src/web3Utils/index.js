/* eslint-disable global-require */
const getEnv = require('../utils/getEnv');

if (require.main === module) {
  console.log('index.js running independently');
  require('dotenv').config({ path: '../.env' });
}

const CONSUMER_CA = getEnv('CONSUMER_CA');
const GOERLI_HTTP = getEnv('GOERLI_HTTP');

const Web3 = require('web3');
const CONSUMER_ABI = require('./ABIs/Consumer.json');

const web3 = new Web3(new Web3.providers.HttpProvider(GOERLI_HTTP));

const consumer = new web3.eth.Contract(CONSUMER_ABI, CONSUMER_CA);

const getPricesFromChainLink = async () => {
  const BTC = await consumer.methods.getLatestBTCPrice().call();
  const ETH = await consumer.methods.getLatestETHPrice().call();
  const LINK = await consumer.methods.getLatestLINKPrice().call();
  const result = { BTC, ETH, LINK };
  return result;
};

module.exports = { getPricesFromChainLink };
