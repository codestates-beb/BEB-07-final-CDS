// modules
import axios from 'axios';

// URL
import config from '../config/config';

export async function getSwaps() {
  try {
    const requestURL = `${config.devURL}/swaps`;

    const swaps = await axios.get(requestURL);
    return swaps.data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getSwapById(swapId) {
  try {
    const requestURL = `${config.devURL}/swaps/${swapId}`;

    const swaps = await axios.get(requestURL);
    return swaps.data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getCoinGeckoAPI(coinName) {
  try {
    const requestURL = `${config.coinGeckoURL}/${coinName}/market_chart?vs_currency=usd&days=1&interval=daily`;

    const marketPriceData = await axios.get(requestURL);
    return marketPriceData.data;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getCoinCompareAPI(coinSymbol) {
  try {
    const requestURL = `${config.chainLinkURL}/pricemultifull?fsyms=${coinSymbol}&tsyms=USD`;
    // const requestURL = `${config.chainLinkURL}/pricemultifull?fsyms=${coinSymbol}&tsyms=USD`;

    const marketPriceData = await axios.get(requestURL);
    return marketPriceData.data;
  } catch (e) {
    console.log(e);
    return e;
  }
}
