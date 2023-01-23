// modules
import axios from "axios";

// URL
import config from '../config/config'

export function getSwaps() {
    const requestURL = `${config.devURL}/swaps`;

    const swaps = axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);

    return swaps;
}

export function getSwapById(swapId) {
    const requestURL = `${config.devURL}/swaps/${swapId}`;

    const swap = axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);

    return swap;
}