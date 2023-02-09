// modules
import axios from 'axios';

// URL
import config from '../config/config';

// dummydata
const {
  pendingErrorDummy,
  activeErrorDummy,
  swapIdDummydata,
  coinGeckoErrorDummydata,
  chainlinkErrorDummydata,
  addressErrorDummydata,
} = require('../assets/errorDummydata/requestDummydata');

export async function getPendingSwaps() {
  try {
    const requestURL = `${config.apiURL}/swaps?status=pending`;

    const swaps = await axios.get(requestURL);
    return swaps.data;
  } catch (e) {
    console.log('An error occurred');
    return pendingErrorDummy;
  }
}

export async function getPendingSwapsByOffset(offset) {
  try {
    const requestURL = `${config.apiURL}/swaps?status=pending&offset=${offset}`;

    const swaps = await axios.get(requestURL);
    return swaps.data;
  } catch (e) {
    console.log('An error occurred');
    return pendingErrorDummy;
  }
}

export async function getActiveSwaps() {
  try {
    const requestURL = `${config.apiURL}/swaps?status=active`;

    const swaps = await axios.get(requestURL);
    return swaps.data;
  } catch (e) {
    console.log('An error occurred');
    return activeErrorDummy;
  }
}

export async function getActiveSwapsByOffset(offset) {
  try {
    const requestURL = `${config.apiURL}/swaps?status=active&offset=${offset}`;

    const swaps = await axios.get(requestURL);
    return swaps.data;
  } catch (e) {
    console.log('An error occurred');
    return activeErrorDummy;
  }
}

export async function getSwapById(swapId) {
  try {
    const requestURL = `${config.apiURL}/swaps/${swapId}`;

    const swaps = await axios.get(requestURL);
    return swaps.data;
  } catch (e) {
    console.log('An error occurred');
    return swapIdDummydata;
  }
}

export async function getSwapByAddress(address) {
  try {
    const requestURL = `${config.apiURL}/users/${address}/swaps`;

    const swaps = await axios.get(requestURL);
    return swaps.data;
  } catch (e) {
    return addressErrorDummydata;
  }
}

export async function getCoinGeckoAPI() {
  try {
    const requestURL = `${config.coinGeckoAPI}`;

    const marketPriceData = await axios.get(requestURL);

    return marketPriceData.data;
  } catch (e) {
    console.log('An error occurred');
    return coinGeckoErrorDummydata;
  }
}

export async function getChainLinkAPI() {
  try {
    const requestURL = `${config.chainLinkAPI}`;

    const marketPriceData = await axios.get(requestURL);

    return marketPriceData.data;
  } catch (e) {
    console.log('An error occurred');
    return chainlinkErrorDummydata;
  }
}
