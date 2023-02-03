import axios from 'axios';
import getEnv from './getEnv';
import redisClient from './redisClient';

const geckoEndpoint = getEnv(
  'GECKO_ENDPOINT',
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,chainlink&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true&precision=2',
);

async function updateGeckoFeed() {
  try {
    const apiData = await axios.get(geckoEndpoint);
    const priceData = apiData.data;
    priceData.bitcoin.usd_24h_change =
      +priceData.bitcoin.usd_24h_change.toFixed(3);
    priceData.ethereum.usd_24h_change =
      +priceData.ethereum.usd_24h_change.toFixed(3);
    priceData.chainlink.usd_24h_change =
      +priceData.chainlink.usd_24h_change.toFixed(3);
    await redisClient.set(
      'geckoPrices',
      JSON.stringify(priceData),
      'EX',
      60 * 60,
    );
    console.log('Gecko Price Feed updated');
  } catch (err) {
    console.log('Error while updating Gecko price feed');
    console.error(err);
  }
}

export default updateGeckoFeed;
