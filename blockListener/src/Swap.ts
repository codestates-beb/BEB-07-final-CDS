import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { SwapInfo } from './types/CDSTypes';

export default class Swap {
  private static instance: Swap;
  private contract: Contract = null;
  private web3: Web3 = null;

  private constructor(websocketURI: string) {
    this.web3 = new Web3(websocketURI);
  }

  public static getInstance(webSocketURI: string) {
    if (!Swap.instance) {
      Swap.instance = new Swap(webSocketURI);
    } else {
      Swap.instance.web3 = new Web3(webSocketURI);
    }
    return Swap.instance;
  }

  public setContract(abi: AbiItem[], address: string) {
    this.contract = new this.web3.eth.Contract(abi, address);
    return this.contract;
  }

  public async getSwapInfo(): Promise<SwapInfo> {
    const [
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      sellerDeposit,
    ] = await this.getPrices();
    const buyer = await this.getBuyer();
    const seller = await this.getSeller();
    const swapInfo = {
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      sellerDeposit,
      buyer,
      seller,
    };
    return swapInfo;
  }

  public async getPrices(): Promise<string[]> {
    const prices = await this.contract.methods.getPrices().call();
    return prices;
  }

  public async getBuyer(): Promise<string> {
    const buyer = await this.contract.methods.getBuyer().call();
    return buyer;
  }

  public async getSeller(): Promise<string> {
    const seller = await this.contract.methods.getSeller().call();
    return seller;
  }

  public async getRounds(): Promise<string> {
    const rounds = await this.contract.methods.rounds().call();
    return rounds;
  }
}
