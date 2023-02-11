import Web3 from 'web3';
import getEnv from './getEnv';

const web3 = new Web3(getEnv('GETH_HTTP'));
const TOKEN_CA = '';
const ADMIN_PK = '';

export function sendEther(address: string): void {
  return;
}

export function sendToken(address: string): void {
  return;
}
