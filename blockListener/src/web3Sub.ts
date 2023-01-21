import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { Transaction } from 'web3-core';
import { AbiItem } from 'web3-utils';
import abi from './CDSABI';
// console.log(abi.abi);
const web3 = new Web3('ws://localhost:8545');

class CDS {
  private static instance: CDS;
  private contract: Contract = null;
  // private web3 = new Web3('ws://20.214.105.181:8545');
  private web3: Web3 = null;

  private constructor(webSocketURI: string) {
    this.web3 = new Web3(webSocketURI);
  }

  public static getInstance(webSocketURI: string) {
    if (!CDS.instance) {
      CDS.instance = new CDS(webSocketURI);
    } else {
      CDS.instance.web3 = new Web3(webSocketURI);
    }
    return CDS.instance;
  }

  public async setContract(abi: any, address: string) {
    this.contract = new this.web3.eth.Contract(abi, address);
    return this.contract;
  }

  public getContract() {
    return this.contract;
  }

  public removeContract() {
    this.contract = null;
  }

  public subEvents(): void {
    // subEvents안에서 이벤트를 듣습니다.
    // 이벤트의 종류를 파싱해서 해당 이벤트의 종류에 따라 디비를 업데이트 합니다.
    // 현재 파싱가능한 이벤트는 MakeSwap과 AcceptSwap이 있습니다.
    //   emit MakeSwap(
    //   addr,
    //   claimPrice,
    //   liquidationPrice,
    //   premium,
    //   premiumInterval,
    //   totalPremiumRounds
    // );
    //emit AcceptSwap(addr, swapId);
    if (!this.contract) {
      throw new Error('contract not specifed!');
    }
    this.contract.events
      .allEvents({}, (err: Error, event) => {
        // console.log(event);
      })
      .on('data', (event) => console.log(event));
  }

  public sync() {
    // sync all unsynced data
  }

  private createOrUpdateUser(): any {}
  private createOrUpdateTransaction(): any {}
  private createOrUpdateSwap(): any {}
}

let cds = CDS.getInstance('ws://localhost:8545');
cds.setContract(abi.abi, '0x21960Bb1eae929A36756C6ee910ba529347309e8');
// console.log(cds.getContract());
cds.subEvents();

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
