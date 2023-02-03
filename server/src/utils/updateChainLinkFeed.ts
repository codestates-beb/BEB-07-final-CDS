import redisClient from './redisClient';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import getEnv from '../utils/getEnv';
import CONSUMER_ABI from './Consumer.json';

const CONSUMER_CA = getEnv('CONSUMER_CA');
const GOERLI_HTTP = getEnv('GOERLI_HTTP');

const web3 = new Web3(new Web3.providers.HttpProvider(GOERLI_HTTP));
const consumer = new web3.eth.Contract(CONSUMER_ABI as AbiItem[], CONSUMER_CA);

async function getPricesFromChainLink() {
  const BTC = await consumer.methods.getLatestBTCPrice().call();
  const ETH = await consumer.methods.getLatestETHPrice().call();
  const LINK = await consumer.methods.getLatestLINKPrice().call();
  const result = { BTC, ETH, LINK };
  return result;
}

async function updateChainLinkFeed() {
  try {
    const priceData = await getPricesFromChainLink();
    const bitcoin = {
      usd: +(+priceData.BTC / 1e8).toFixed(2),
      last_updated_at: new Date().getTime(),
    };
    const ethereum = {
      usd: +(+priceData.ETH / 1e8).toFixed(2),
      last_updated_at: new Date().getTime(),
    };
    const chainlink = {
      usd: +(+priceData.LINK / 1e8).toFixed(2),
      last_updated_at: new Date().getTime(),
    };
    const prices = { bitcoin, ethereum, chainlink };
    await redisClient.set('linkPrices', JSON.stringify(prices), 'EX', 60 * 60);
    console.log('Chain Link Price Feed updated');
  } catch (err) {
    console.log('Error while updating Chain Link price feed');
    console.error(err);
  }
}

export default updateChainLinkFeed;
