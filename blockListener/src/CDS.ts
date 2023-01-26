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

export default class CDS {
  private static instance: CDS;
  private contract: Contract = null;
  private web3: Web3 = null;
  private manager: EntityManager = null;

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

  public async getPastEvents() {
    // TODO: improvise more efficient logic, NOT brute force like this
    const createSwapEvents = await this.contract.getPastEvents('CreateSwap', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    for await (let event of createSwapEvents) {
      const { transactionHash } = event;
      // hit db for this txhash
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: transactionHash,
      });
      if (transaction) continue;
      await this.createSwapHandler(event);
    }

    const acceptSwapEvents = await this.contract.getPastEvents('AcceptSwap', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    for await (let event of acceptSwapEvents) {
      const { transactionHash } = event;
      // hit db for this txhash
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: transactionHash,
      });
      if (transaction) continue;
      await this.acceptSwapHandler(event);
    }

    const closeSwapEvents = await this.contract.getPastEvents('Close', {
      fromBlock: 0,
      toBlock: 'latest',
    });

    for await (let event of closeSwapEvents) {
      const { transactionHash } = event;
      // hit db for this txhash
      let transaction = await this.manager.findOneBy(Transactions, {
        txHash: transactionHash,
      });
      if (transaction) continue;
      await this.closeSwapHandler(event);
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
      .Close({}, (err: Error, event: EventData) => {
        console.log(`** Close Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.closeSwapHandler(event);
      });
  }

  public sync() {
    // sync all unsynced data
  }

  private async createSwapHandler(event: EventData) {
    const {
      buyer,
      swapId,
      claimPrice,
      liquidationPrice,
      premium,
      premiumInterval,
      totalPremiumRounds,
      buyerDeposit,
    } = event.returnValues;
    const currentTime: Date = new Date();
    let user = await this.manager.findOneBy(Users, {
      address: buyer,
    });
    if (!user) {
      console.log('** no such user');
      user = new Users();
      user.address = buyer;
      user.nickname = null;
      user.soldCount = 0;
      user.boughtCount = 1;
      user.lastBought = currentTime;
      user.lastSold = null;
      user.createdAt = currentTime;
      user.updatedAt = currentTime;
      await this.manager.save(user);
    } else {
      console.log('** user found! **');
      user.boughtCount++;
      user.lastBought = currentTime;
      user.updatedAt = currentTime;
      await this.manager.save(user);
    }

    let swap = await this.manager.findOneBy(Swaps, {
      swapId: +swapId,
    });

    if (!swap) {
      swap = new Swaps();
      swap.swapId = +swapId;
      swap.claimPrice = +claimPrice;
      swap.liquidationPrice = +liquidationPrice;
      swap.premium = +premium;
      swap.premiumInterval = +premiumInterval;
      swap.totalPremiumRounds = +totalPremiumRounds;
      swap.buyerDeposit = +buyerDeposit;
      swap.buyer = buyer;
      // TODO: add initial Asset Price
      swap.initialAssetPrice = 0;
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
  }

  private async acceptSwapHandler(event: EventData) {
    const { seller, swapId, sellerDeposit } = event.returnValues;
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

      let user = await this.manager.findOneBy(Users, {
        address: seller,
      });
      if (!user) {
        console.log('** no such user, creating**');
        user = new Users();
        user.address = seller;
        user.nickname = null;
        user.soldCount = 1;
        user.boughtCount = 0;
        user.lastBought = null;
        user.lastSold = currentTime;
        user.createdAt = currentTime;
        user.updatedAt = currentTime;
        this.manager.save(user);
      } else {
        console.log('** user found! **');
        user.soldCount++;
        user.lastSold = currentTime;
        user.updatedAt = currentTime;
        await this.manager.save(user);
      }

      swap.status = 'active';
      swap.seller = seller;
      swap.sellerDeposit = sellerDeposit;
      await this.manager.save(swap);

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
  private async closeSwapHandler(event: EventData) {
    console.log('closeSwapHander() is not implemented yet');
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
  private createOrUpdateTransaction(): any {}
  private createOrUpdateSwap(): any {}
}
