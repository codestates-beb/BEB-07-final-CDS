import Web3 from 'web3';
import getEnv from './getEnv';
import { abi } from '../contractArtifacts/FUSD.json';

const web3 = new Web3(getEnv('GETH_HTTP'));
const FUSD_CA = getEnv('FUSD_CA');
const fusd = new web3.eth.Contract(abi as any, FUSD_CA);
const adminAccount = web3.eth.accounts.privateKeyToAccount(getEnv('ADMIN_PK'));
const ADMIN_PASSWORD = getEnv('ADMIN_PASSWORD');

const etherAmount = 5 * 1e18;
const tokenAmount = '500000';

export async function sendEther(address: string): Promise<void> {
  web3.eth.personal.sendTransaction(
    {
      from: adminAccount.address,
      gasPrice: '20000000000',
      gas: '21000',
      to: address,
      value: etherAmount,
      data: '',
    },
    ADMIN_PASSWORD,
  );
}

export async function sendToken(address: string): Promise<void> {
  await fusd.methods.transfer(address, tokenAmount).send({
    from: adminAccount.address,
  });
}
