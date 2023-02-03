import { getPricesFromChainLink } from '../web3utils/getPricesFromChainLink';
import redisClient from './redisClient';

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
