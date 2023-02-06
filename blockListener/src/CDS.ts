import Web3 from 'web3';
import { Contract, EventData } from 'web3-eth-contract';
import { Transaction } from 'web3-core';
import { AbiItem } from 'web3-utils';
import { abi as cdsAbi } from './contractArtifacts/CDS.json';
import { swapAbi } from './contractArtifacts/Swap.json';
import { EntityManager, TreeChildren } from 'typeorm';
import { Users } from './entities/Users';
import { Transactions } from './entities/Transactions';
import { Swaps } from './entities/Swaps';
import Swap from './Swap';
import getEnv from './utils/getEnv';
const GETH_WEBSOCKET = getEnv('GETH_WEBSOCKET');

interface CreateSwapEvent extends Omit<EventData, 'returnValues'> {
  returnValues: {
    hostAddr: string;
    isBuyer: boolean;
    swapId: number;
    swap: string;
  };
}

interface CreateSwapReturns {
  hostAddr: string;
  isBuyer: boolean;
  swapId: number;
  swap: string;
}

interface AcceptSwapEvent extends EventData {
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  address: string;
  type: string;
  removed: false;
  returnValues: {
    seller: string;
    swapId: string;
    sellerDeposit: string;
  };
  event: string;
  signature: string;
  raw: any;
}

interface SwapInfo {
  initAssetPrice: string;
  claimPrice: string;
  liquidationPrice: string;
  premium: string;
  sellerDeposit: string;
  buyer: string | null;
  seller: string | null;
}

export default class CDS {
  private static instance: CDS;
  private contract: Contract = null;
  private web3: Web3 = null;
  private manager: EntityManager = null;
  private fromBlock: number = 0;
  private web3Endpoint: string;

  private constructor(webSocketURI: string, manager: EntityManager) {
    this.web3 = new Web3(webSocketURI);
    this.web3Endpoint = webSocketURI;
    this.manager = manager;
  }

  public static getInstance(webSocketURI: string, manager: EntityManager) {
    if (!CDS.instance) {
      CDS.instance = new CDS(webSocketURI, manager);
    } else {
      CDS.instance.web3 = new Web3(webSocketURI);
    }
    return CDS.instance;
  }

  public async setContract(abi: any, address: string) {
    this.contract = new this.web3.eth.Contract(abi, address);

    const ContractName = await this.contract.events;
    if (ContractName.length === 0) {
      throw new Error('Invalid Contract');
    }
    return this.contract;
  }

  public getContract() {
    if (!this.contract) {
      throw new Error('contract not set!');
    }
    return this.contract;
  }

  public removeContract() {
    if (!this.contract) {
      throw new Error('contract not set!');
    }
    this.contract = null;
  }

  public async setFromBlock(txHash: string) {
    const transaction = await this.web3.eth.getTransaction(txHash);
    if (transaction) {
      this.fromBlock = transaction.blockNumber;
    }
    return;
  }

  private async getTxTimestamp(txHash: string): Promise<number> {
    try {
      const tx = await this.web3.eth.getTransaction(txHash);
      const blockInfo = await this.web3.eth.getBlock(tx.blockNumber);
      return blockInfo.timestamp as number;
    } catch (error) {
      console.error(error);
      return 0;
    }
  }

  private async isTxProcessed(transactionHash: string): Promise<Transactions> {
    return this.manager.findOneBy(Transactions, {
      txHash: transactionHash,
    });
  }

  public async getPastEvents() {
    const allEvents = await this.contract.getPastEvents('allEvents', {
      fromBlock: this.fromBlock,
      toBlock: 'latest',
    });

    for await (let event of allEvents) {
      const { transactionHash } = event;
      if (await this.isTxProcessed(transactionHash)) continue;
      if (event.event === 'CreateSwap') {
        console.log('Create Swap found!');
        await this.createSwapHandler(event);
      } else if (event.event === 'AcceptSwap') {
        console.log('Accept Swap found!');
        await this.acceptSwapHandler(event);
      } else if (event.event === 'CancelSwap') {
        console.log('Cancel Swap found!');
        await this.cancelSwapHandler(event);
      } else if (event.event === 'ClaimSwap') {
        console.log('Claim Swap found!');
        await this.claimSwapHandler(event);
      } else if (event.event === 'CloseSwap') {
        console.log('Close Swap found!');
        await this.closeSwapHandler(event);
      } else if (event.event === 'PayPremium') {
        console.log('PayPremium Swap found!');
        await this.payPremiumHandler(event);
      } else if (event.event === 'OwnershipTransferred') {
        console.log('OwnershipTransferred found!');
        console.log(`Contract Admin addr is : ${event.returnValues.newOwner}`);
      } else {
        console.error(
          `Not specified Event ${event.event} : ${event.returnValues}`,
        );
      }
    }
    console.log('** DB synchronized with all past events **');
  }

  public subEvents(): void {
    if (!this.contract) {
      throw new Error('contract not set!');
    }
    this.contract.events
      .CreateSwap({}, (err: Error, event: CreateSwapEvent) => {
        console.log('**Create Swap Emitted**');
      })
      .on('data', async (event: CreateSwapEvent) => {
        console.log(`** Create Swap Emitted ${event.transactionHash} **`);
        await this.createSwapHandler(event);
      });

    this.contract.events
      .AcceptSwap({}, (err: Error, event: AcceptSwapEvent) => {
        console.log(`** Accept Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: AcceptSwapEvent) => {
        await this.acceptSwapHandler(event);
      });

    this.contract.events
      .CancelSwap({}, (err: Error, event: EventData) => {
        console.log(`** Cancel Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.cancelSwapHandler(event);
      });

    this.contract.events
      .ClaimSwap({}, (err: Error, event: EventData) => {
        console.log(`** ClaimSwap Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.claimSwapHandler(event);
      });

    this.contract.events
      .CloseSwap({}, (err: Error, event: EventData) => {
        console.log(`** CloseSwap Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.closeSwapHandler(event);
      });

    this.contract.events
      .PayPremium({}, (err: Error, event: EventData) => {
        console.log(`** PayPremium Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.payPremiumHandler(event);
      });
  }

  // get detailed swapinfo from Swap.sol
  private async getSwapInfo(swapAddr: string): Promise<SwapInfo> {
    const swapInstance = Swap.getInstance(this.web3Endpoint);
    swapInstance.setContract(swapAbi as AbiItem[], swapAddr);
    const swapInfo = await swapInstance.getSwapInfo();
    return swapInfo;
  }

  private async getSwapAddr(swapId: string): Promise<string> {
    const swapAddr = await this.contract.methods.getSwap(swapId).call();
    return swapAddr;
  }

  private async getBuyer(swapId: number): Promise<string> {
    const buyerInfo: string = await this.contract.methods
      .getBuyer(swapId)
      .call();
    return buyerInfo;
  }
  private async getSeller(swapId: number): Promise<string> {
    const sellerInfo: string = await this.contract.methods
      .getSeller(swapId)
      .call();
    return sellerInfo;
  }

  private async getInterval(swapId: number): Promise<string> {
    const intervalInfo = await this.contract.methods.getInterval(swapId).call();
    return intervalInfo;
  }

  private async getRounds(swapId: number): Promise<string> {
    const roundsInfo = await this.contract.methods.getRounds(swapId).call();
    return roundsInfo;
  }

  private async createSwapHandler(event: EventData) {
    const { isBuyer, swapId } = event.returnValues;
    const hostAddr = event.returnValues.hostAddr.toLowerCase();
    const swapAddr = event.returnValues.swap.toLowerCase();
    const {
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      sellerDeposit,
      seller,
      buyer,
    } = await this.getSwapInfo(swapAddr);

    const amountOfAssets =
      +sellerDeposit / (+initAssetPrice - +liquidationPrice);
    const currentTime: number = await this.getTxTimestamp(
      event.transactionHash,
    );
    const buyerDeposit = 3 * +premium;
    const premiumInterval = await this.getInterval(swapId);
    const totalPremiumRounds = await this.getRounds(swapId);

    try {
      let user = await this.manager.findOneBy(Users, {
        address: hostAddr,
      });
      if (!user) {
        console.log('** no such user **');
        user = new Users();
        user.address = hostAddr;
        user.nickname = null;
        user.soldCount = 0;
        user.boughtCount = 0;
        user.createdAt = currentTime;
        user.updatedAt = currentTime;
        await this.manager.save(user);
      } else {
        console.log('** user found! **');
        user.updatedAt = currentTime;
        await this.manager.save(user);
      }

      let swap = await this.manager.findOneBy(Swaps, {
        swapId: +swapId,
      });
      if (!swap) {
        // emitted variables
        swap = new Swaps();
        swap.swapId = +swapId;
        swap.contractAddress = swapAddr;
        swap.initialAssetPrice = +initAssetPrice;
        swap.claimPrice = +claimPrice;
        swap.liquidationPrice = +liquidationPrice;
        swap.premium = +premium;
        swap.sellerDeposit = +sellerDeposit;
        swap.createdAt = currentTime;
        swap.updatedAt = currentTime;

        // derived variables
        swap.amountOfAssets = +amountOfAssets;
        swap.buyerDeposit = +buyerDeposit;
        swap.premiumRate = 2; // TODO: make variable
        swap.premiumInterval = +premiumInterval;
        swap.remainPremiumRounds = +totalPremiumRounds;
        swap.totalPremiumRounds = +totalPremiumRounds;
        swap.buyer = isBuyer ? hostAddr : null;
        swap.seller = isBuyer ? null : hostAddr;
        swap.totalAssets = +initAssetPrice * +amountOfAssets;
        swap.dropRate = (+initAssetPrice - +claimPrice) / +initAssetPrice;
        swap.status = 'pending';
        await this.manager.save(swap);
      }
      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async acceptSwapHandler(event: EventData) {
    const { swapId } = event.returnValues;
    const swapAddr = (await this.getSwapAddr(swapId)).toLowerCase();
    const swapInfo = await this.getSwapInfo(swapAddr);
    const buyerAddr = swapInfo.buyer.toLowerCase();
    const sellerAddr = swapInfo.seller.toLowerCase();
    const currentTime: number = await this.getTxTimestamp(
      event.transactionHash,
    );

    try {
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: event.transactionHash,
      });
      if (transaction) throw new Error('This transaction already processed');

      let swap = await this.manager.findOneBy(Swaps, {
        swapId: +swapId,
      });
      if (!swap) throw new Error(`swapId ${swapId} is not on database`);

      await this.handleSeller(sellerAddr, currentTime);
      await this.handleBuyer(buyerAddr, currentTime);

      swap.status = 'active';
      swap.seller = sellerAddr;
      swap.buyer = buyerAddr;
      await this.manager.save(swap);
      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async cancelSwapHandler(event: EventData) {
    const { swapId } = event.returnValues;
    const currentTime: number = await this.getTxTimestamp(
      event.transactionHash,
    );
    try {
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: event.transactionHash,
      });
      if (transaction) throw new Error('This transaction already processed');

      let swap = await this.manager.findOneBy(Swaps, {
        swapId: +swapId,
      });
      if (!swap) throw new Error(`swapId ${swapId} is not on database`);

      swap.status = 'inactive';
      swap.updatedAt = currentTime;
      swap.terminatedAt = currentTime;
      await this.manager.save(swap);

      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async claimSwapHandler(event: EventData) {
    const { swapId, claimReward } = event.returnValues;
    const currentTime: number = await this.getTxTimestamp(
      event.transactionHash,
    );
    try {
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: event.transactionHash,
      });
      if (transaction) throw new Error('This transaction already processed');

      let swap = await this.manager.findOneBy(Swaps, {
        swapId: +swapId,
      });
      if (!swap) throw new Error(`swapId ${swapId} is not on database`);

      swap.status = 'claimed';
      swap.updatedAt = currentTime;
      swap.terminatedAt = currentTime;
      await this.manager.save(swap);

      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async closeSwapHandler(event: EventData) {
    const { swapId } = event.returnValues;
    const currentTime: number = await this.getTxTimestamp(
      event.transactionHash,
    );
    try {
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: event.transactionHash,
      });
      if (transaction) throw new Error('This transaction already processed');

      let swap = await this.manager.findOneBy(Swaps, {
        swapId: +swapId,
      });
      if (!swap) throw new Error(`swapId ${swapId} is not on database`);

      swap.status = 'inactive';
      swap.updatedAt = currentTime;
      swap.terminatedAt = currentTime;
      await this.manager.save(swap);
      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async payPremiumHandler(event: EventData) {
    const { swapId } = event.returnValues;
    const currentTime: number = await this.getTxTimestamp(
      event.transactionHash,
    );
    try {
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: event.transactionHash,
      });
      if (transaction) throw new Error('This transaction already processed');

      let swap = await this.manager.findOneBy(Swaps, {
        swapId: +swapId,
      });
      if (!swap) throw new Error(`swapId ${swapId} is not on database`);
      swap.remainPremiumRounds = swap.remainPremiumRounds - 1;
      swap.updatedAt = currentTime;
      swap.lastPaidAt = currentTime;
      await this.manager.save(swap);
      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async userController(event: EventData) {} // TODO refactor
  private async swapController(event: EventData) {} // TODO refactor

  private async txController(
    event: EventData,
    currentTime: number,
    swapId: string,
  ) {
    let transaction = await this.manager.findOneBy(Transactions, {
      txHash: event.transactionHash,
    });
    if (!transaction) {
      console.log('** New Transaction **');
      transaction = new Transactions();
      transaction.txHash = event.transactionHash;
      transaction.blockNum = event.blockNumber;
      transaction.event = event.event;
      transaction.swapId = +swapId;
      transaction.createdAt = currentTime;
      transaction.updatedAt = currentTime;
      await this.manager.save(transaction);
    }
  }

  // TODO refactor
  private async handleSeller(sellerAddr: string, currentTime: number) {
    let seller = await this.manager.findOneBy(Users, {
      address: sellerAddr,
    });
    if (!seller) {
      console.log('** no such user, creating**');
      seller = new Users();
      seller.address = sellerAddr;
      seller.nickname = null;
      seller.soldCount = 1;
      seller.boughtCount = 0;
      seller.lastBought = null;
      seller.lastSold = currentTime;
      seller.createdAt = currentTime;
      seller.updatedAt = currentTime;
      this.manager.save(seller);
    } else {
      console.log('** user found! **');
      seller.soldCount++;
      seller.lastSold = currentTime;
      seller.updatedAt = currentTime;
      await this.manager.save(seller);
    }
  }

  // TODO refactor
  private async handleBuyer(buyerAddr: string, currentTime: number) {
    let buyer = await this.manager.findOneBy(Users, {
      address: buyerAddr,
    });
    if (!buyer) {
      console.log('** no such user, creating**');
      buyer = new Users();
      buyer.address = buyerAddr;
      buyer.nickname = null;
      buyer.soldCount = 0;
      buyer.boughtCount = 1;
      buyer.lastBought = currentTime;
      buyer.lastSold = null;
      buyer.createdAt = currentTime;
      buyer.updatedAt = currentTime;
      this.manager.save(buyer);
    } else {
      console.log('** user found! **');
      buyer.boughtCount++;
      buyer.lastBought = currentTime;
      buyer.updatedAt = currentTime;
      await this.manager.save(buyer);
    }
  }
  private createOrUpdateTransaction(): any {}
  private createOrUpdateSwap(): any {}
}
