/* eslint-disable global-require */
import getEnv from '../utils/getEnv';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import CONSUMER_ABI from './ABIs/Consumer.json';

const CONSUMER_CA = getEnv('CONSUMER_CA');
const GOERLI_HTTP = getEnv('GOERLI_HTTP');

const web3 = new Web3(new Web3.providers.HttpProvider(GOERLI_HTTP));

const consumer = new web3.eth.Contract(CONSUMER_ABI as AbiItem[], CONSUMER_CA);

const getPricesFromChainLink = async (): Promise<{
  BTC?: string;
  ETH?: string;
  LINK?: string;
}> => {
  const BTC = await consumer.methods.getLatestBTCPrice().call();
  const ETH = await consumer.methods.getLatestETHPrice().call();
  const LINK = await consumer.methods.getLatestLINKPrice().call();
  const result = { BTC, ETH, LINK };
  return result;
};

export default getPricesFromChainLink;
