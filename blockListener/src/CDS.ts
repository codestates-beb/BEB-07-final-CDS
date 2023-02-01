import Web3 from 'web3';
import { Contract, EventData } from 'web3-eth-contract';
import { Transaction } from 'web3-core';
import { AbiItem } from 'web3-utils';
import { abi } from './contractArtifacts/CDS.json';
import { EntityManager } from 'typeorm';
import { Users } from './entities/Users';
import { Transactions } from './entities/Transactions';
import { Swaps } from './entities/Swaps';

interface CreateSwapEvent extends EventData {
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
  address: string;
  type: string;
  removed: false;
  returnValues: {
    buyer: string;
    claimPrice: string;
    liquidationPrice: string;
    premium: string;
    premiumInterval: string;
    totalPremiumRounds: string;
    buyerDeposit: string;
    swapId: string;
  };
  event: string;
  signature: string;
  raw: any;
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
}

export default class CDS {
  private static instance: CDS;
  private contract: Contract = null;
  private web3: Web3 = null;
  private manager: EntityManager = null;
  private fromBlock: number = 0;

  private constructor(webSocketURI: string, manager: EntityManager) {
    this.web3 = new Web3(webSocketURI);
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
    if (txHash === '0') {
      this.fromBlock = 0;
      return;
    }
    const transaction = await this.web3.eth.getTransaction(txHash);
    this.fromBlock = transaction.blockNumber;
    return;
  }

  private async isTxProcessed(transactionHash: string): Promise<Transactions> {
    return this.manager.findOneBy(Transactions, {
      txHash: transactionHash,
    });
  }

  public async getPastEvents() {
    let eventsList: EventData[] = [];
    const createSwapEvents = await this.contract.getPastEvents('CreateSwap', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    const acceptSwapEvents = await this.contract.getPastEvents('AcceptSwap', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    const cancelSwapEvents = await this.contract.getPastEvents('CancelSwap', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    const claimSwapEvents = await this.contract.getPastEvents('ClaimSwap', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    const closeSwapEvents = await this.contract.getPastEvents('CloseSwap', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    eventsList = [
      ...createSwapEvents,
      ...acceptSwapEvents,
      ...cancelSwapEvents,
      ...claimSwapEvents,
      ...closeSwapEvents,
    ];
    console.log(eventsList);

    for await (let event of eventsList) {
      const { transactionHash } = event;
      if (await this.isTxProcessed(transactionHash)) continue;
      console.log(event.event);
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
      } else {
        throw new Error('This event is not sepcified ');
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
  }

  private async getSwap(swapId: number): Promise<SwapInfo> {
    const swapInfo: SwapInfo = await this.contract.methods
      .getSwap(swapId)
      .call();
    return swapInfo;
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

  private async getRoundsLeft(swapId: number): Promise<string> {
    const roundsInfo = await this.contract.methods.getRoundsLeft(swapId).call();
    return roundsInfo;
  }

  private async createSwapHandler(event: EventData) {
    const { hostAddr, isBuyer, swapId } = event.returnValues;
    const {
      initAssetPrice,
      claimPrice,
      liquidationPrice,
      premium,
      sellerDeposit,
    } = await this.getSwap(swapId);

    const amountOfAssets =
      +sellerDeposit / (+initAssetPrice - +liquidationPrice);
    const currentTime: Date = new Date();
    const buyerDeposit = 3 * +premium;
    const premiumInterval = await this.getInterval(swapId);
    const totalPremiumRounds = await this.getRoundsLeft(swapId);

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
        user.lastBought = isBuyer ? currentTime : null;
        user.lastSold = isBuyer ? null : currentTime;
        user.createdAt = currentTime;
        user.updatedAt = currentTime;
        await this.manager.save(user);
      } else {
        console.log('** user found! **');
        user.lastBought = isBuyer ? currentTime : null;
        user.lastSold = isBuyer ? null : currentTime;
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
        swap.initialAssetPrice = +initAssetPrice;
        swap.claimPrice = +claimPrice;
        swap.liquidationPrice = +liquidationPrice;
        swap.premium = +premium;
        swap.sellerDeposit = +sellerDeposit;

        // derived variables
        swap.amountOfAssets = +amountOfAssets;
        swap.buyerDeposit = +buyerDeposit;
        swap.premiumRate = 2; // TODO: make variable
        swap.premiumInterval = +premiumInterval;
        swap.totalPremiumRounds = +totalPremiumRounds;
        swap.buyer = isBuyer ? hostAddr : null;
        swap.seller = isBuyer ? null : hostAddr;
        swap.totalAssets = +initAssetPrice * +amountOfAssets;
        swap.dropRate = (+initAssetPrice - +claimPrice) / +initAssetPrice;
        swap.status = 'pending';
        await this.manager.save(swap);
      }

      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: event.transactionHash,
      });
      if (!transaction) {
        console.log('** New Transaction **');
        transaction = new Transactions();
        transaction.txHash = event.transactionHash;
        transaction.blockNum = event.blockNumber;
        transaction.swapId = +swapId;
        transaction.createdAt = currentTime;
        transaction.updatedAt = currentTime;
        await this.manager.save(transaction);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async acceptSwapHandler(event: EventData) {
    console.log(event.returnValues);
    const { guestAddr, swapId } = event.returnValues;
    const swapInfo = await this.getSwap(swapId);
    const buyerAddr = await this.getBuyer(swapId);
    const sellerAddr = await this.getSeller(swapId);
    console.log({ swapInfo, buyerAddr, sellerAddr });
    const currentTime: Date = new Date();

    try {
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: event.transactionHash,
      });
      if (transaction) throw new Error('This transaction already processed');

      let swap = await this.manager.findOneBy(Swaps, {
        swapId: +swapId,
      });
      if (!swap) throw new Error(`swapId ${swapId} is not on database`);

      await this.handleSeller(sellerAddr);
      await this.handleBuyer(buyerAddr);

      swap.status = 'active';
      swap.seller = sellerAddr;
      swap.buyer = buyerAddr;
      await this.manager.save(swap);

      console.log('** New Transaction **');
      transaction = new Transactions();
      transaction.txHash = event.transactionHash;
      transaction.blockNum = event.blockNumber;
      transaction.swapId = +swapId;
      transaction.createdAt = currentTime;
      transaction.updatedAt = currentTime;

      await this.manager.save(transaction);
    } catch (error) {
      console.error(error);
    }
  }

  private async cancelSwapHandler(event: EventData) {
    const { swapId } = event.returnValues;
    const currentTime = new Date();
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
      await this.manager.save(swap);

      console.log('** New Transaction **');
      transaction = new Transactions();
      transaction.txHash = event.transactionHash;
      transaction.blockNum = event.blockNumber;
      transaction.swapId = +swapId;
      transaction.createdAt = currentTime;
      transaction.updatedAt = currentTime;
      await this.manager.save(transaction);
    } catch (error) {
      console.error(error);
    }
  }

  private async claimSwapHandler(event: EventData) {
    const { swapId, claimReward } = event.returnValues;
    const currentTime = new Date();
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
      await this.manager.save(swap);

      console.log('** New Transaction **');
      transaction = new Transactions();
      transaction.txHash = event.transactionHash;
      transaction.blockNum = event.blockNumber;
      transaction.swapId = +swapId;
      transaction.createdAt = currentTime;
      transaction.updatedAt = currentTime;
      await this.manager.save(transaction);
    } catch (error) {
      console.error(error);
    }
  }

  private async closeSwapHandler(event: EventData) {
    const { swapId } = event.returnValues;
    const currentTime = new Date();
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
      await this.manager.save(swap);

      console.log('** New Transaction **');
      transaction = new Transactions();
      transaction.txHash = event.transactionHash;
      transaction.blockNum = event.blockNumber;
      transaction.swapId = +swapId;
      transaction.createdAt = currentTime;
      transaction.updatedAt = currentTime;
      await this.manager.save(transaction);
    } catch (error) {
      console.error(error);
    }
  }

  private async handleSeller(sellerAddr: string) {
    const currentTime: Date = new Date();
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

  private async handleBuyer(buyerAddr: string) {
    const currentTime: Date = new Date();
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
