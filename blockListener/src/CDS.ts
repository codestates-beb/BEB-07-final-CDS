import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Transaction } from 'web3-core';
import { AbiItem } from 'web3-utils';
import { abi } from './contractArtifacts/CDS.json';
import { EntityManager } from 'typeorm';
import { Users } from './entities/Users';
import { Transactions } from './entities/Transactions';
import { Swaps } from './entities/Swaps';
// const web3 = new Web3('ws://localhost:8545');

interface ContractEvent {
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

  public subEvents(): void {
    if (!this.contract) {
      throw new Error('contract not set!');
    }
    this.contract.events
      .CreateSwap({}, (err: Error, event) => {
        console.log('**Create Swap Emitted**');
      })
      .on('data', async (event: ContractEvent) => {
        //0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b kim
        //0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d seol
        // user를 찾는다. 있으면 업데이트하고, 없으면 새로 만든다.
        const { buyer, swapId } = event.returnValues;
        const currentTime: Date = new Date();
        let user = await this.manager.findOneBy(Users, {
          address: buyer,
        });
        if (!user) {
          user = new Users();
          user.address = buyer;
          user.nickname = null;
          user.soldCount = 0;
          user.boughtCount = 1;
          user.lastBought = currentTime;
          user.lastSold = null;
          user.createdAt = currentTime;
          user.updatedAt = currentTime;
          this.manager.save(user);
        } else {
          user.boughtCount++;
          user.lastBought = currentTime;
          user.updatedAt = currentTime;
          this.manager.save(user);
        }
        console.log(user);

        let swap = await this.manager.findOneBy(Swaps, {
          swapId,
        });

        if (!swap) {
          swap = new Swaps();
          swap.swapId = swapId;
          swap.claimPrice = claimPrice;
          swap.liquidationPrice = liquidationPrice;
          swap.premium = premium;
          swap.premiumInterval = premiumInterval;
          swap.totalPremiumRounds = totalPremiumRounds;
          swap.buyerDeposit = buyerDeposit;
        }

        let transaction = await this.manager.findOneBy(Transactions, {
          txHash: event.transactionHash,
        });
        if (!transaction) {
          transaction = new Transactions();
          transaction.txHash = event.transactionHash;
          transaction.blockNum = event.blockNumber;
          transaction.swapId = 0;
          transaction.createdAt = currentTime;
          transaction.updatedAt = currentTime;
          this.manager.save(user);
        }
      });

    this.contract.events
      .AcceptSwap({}, (err: Error, event) => {
        console.log('**Acceps Swap Emitted**');
      })
      .on('data', (event) => {});
  }

  public sync() {
    // sync all unsynced data
  }

  private createOrUpdateUser(): any {}
  private createOrUpdateTransaction(): any {}
  private createOrUpdateSwap(): any {}
}

// 'logs' subscription does not prints deployed contract
// web3.eth
//   .subscribe('logs', {}, (err, result) => {
//     if (!err) console.log(result);
//   })
//   .on('data', function (transaction) {
//     console.log(transaction);
//   });
// const cds = web3.web3.eth
//   .subscribe('newBlockHeaders', (err, result) => {
//     if (!err) console.log(result);
//   })
//   .on('connected', function (subscriptionId) {
//     console.log(subscriptionId);
//   })
//   .on('data', function (transaction) {
//     console.log(transaction);
//   });

//https://github.com/web3/web3.js/issues/4301k
