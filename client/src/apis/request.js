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
