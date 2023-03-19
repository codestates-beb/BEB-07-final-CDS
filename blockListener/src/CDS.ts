import Web3 from 'web3';
import { Contract, EventData } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils';
import { abi } from './contractArtifacts/Swap.json';
import { EntityManager } from 'typeorm';
import { Users } from './entities/Users';
import { Transactions } from './entities/Transactions';
import { Swaps } from './entities/Swaps';
import { sendEmail, createMessage } from './utils/emailHandler';
import Swap from './Swap';
import {
  CreateReturnValue,
  AcceptReturnValue,
  OtherReturnValue,
  SwapInfo,
  ClaimReturnValue,
  EmailData,
} from './types/CDSTypes';

export default class CDS {
  private static instance: CDS;
  private contract: Contract = null;
  private web3: Web3 = null;
  private manager: EntityManager = null;
  private fromBlock: number = 0;
  private web3Endpoint: string;
  private defaultNickName: string = 'anonymous';

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
      if (event.event === 'Create') {
        console.log('Create Event found!');
        await this.createEventHandler(event, false);
      } else if (event.event === 'Accept') {
        console.log('Accept Event found!');
        await this.acceptEventHandler(event, false);
      } else if (event.event === 'Cancel') {
        console.log('Cancel Event found!');
        await this.cancelEventHandler(event, false);
      } else if (event.event === 'Claim') {
        console.log('Claim Event found!');
        await this.claimEventHandler(event, false);
      } else if (event.event === 'Close') {
        console.log('Close Event found!');
        await this.closeEventHandler(event, false);
      } else if (event.event === 'Expire') {
        console.log('Expire Event found!');
        await this.expireEventHandler(event, false);
      } else if (event.event === 'PayPremium') {
        console.log('PayPremium Event found!');
        await this.payPremiumEventHandler(event, false);
      } else if (event.event === 'OwnershipTransferred') {
        console.log('OwnershipTransferred found!');
        const admin = event.returnValues.newOwner;
        console.log(`Contract Admin addr is : ${admin}`);
        let user = await this.manager.findOneBy(Users, {
          address: admin,
        });
        const currentTime: number = await this.getTxTimestamp(
          event.transactionHash,
        );
        if (!user) {
          console.log('** admin not registered, registering admin**');
          user = new Users();
          user.address = admin;
          user.nickname = 'admin';
          user.soldCount = 0;
          user.boughtCount = 0;
          user.createdAt = currentTime;
          user.updatedAt = currentTime;
          await this.manager.save(user);
        } else {
          console.log('** admin user found! **');
        }
      } else {
        console.error(event);
        console.error(
          `Not specified Event ${event}, ${event.event} : ${event.returnValues}`,
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
      .Create({}, (err: Error, event: EventData) => {
        console.log('**Create Swap Emitted**');
      })
      .on('data', async (event: EventData) => {
        console.log(`** Create Swap Emitted ${event.transactionHash} **`);
        await this.createEventHandler(event);
      });

    this.contract.events
      .Accept({}, (err: Error, event: EventData) => {
        console.log(`** Accept Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.acceptEventHandler(event);
      });

    this.contract.events
      .Cancel({}, (err: Error, event: EventData) => {
        console.log(`** Cancel Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.cancelEventHandler(event);
      });

    this.contract.events
      .Claim({}, (err: Error, event: EventData) => {
        console.log(`** ClaimSwap  Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.claimEventHandler(event);
      });

    this.contract.events
      .Close({}, (err: Error, event: EventData) => {
        console.log(`** Close Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.closeEventHandler(event);
      });

    this.contract.events
      .Expire({}, (err: Error, event: EventData) => {
        console.log(`** Expire Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.expireEventHandler(event);
      });

    this.contract.events
      .PayPremium({}, (err: Error, event: EventData) => {
        console.log(`** PayPremium Swap Emitted ${event.transactionHash} **`);
      })
      .on('data', async (event: EventData) => {
        await this.payPremiumEventHandler(event);
      });
  }

  // get detailed swapinfo from Swap.sol
  private async getSwapInfo(swapAddr: string): Promise<SwapInfo> {
    const swapInstance = Swap.getInstance(this.web3Endpoint);
    swapInstance.setContract(abi as AbiItem[], swapAddr);
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

  // private async getRounds(swapId: number): Promise<string> {
  //   const roundsInfo = await this.contract.methods.getRounds(swapId).call();
  //   return roundsInfo;
  // }

  private async getRounds(swapId: number): Promise<string> {
    const swapAddr = await this.contract.methods.getSwap(swapId).call();
    const swapInstance = Swap.getInstance(this.web3Endpoint);
    swapInstance.setContract(abi as AbiItem[], swapAddr);
    const roundInfo = await swapInstance.getRounds();
    return roundInfo;
  }

  private async createEventHandler(event: EventData, isLive: boolean = true) {
    const emailData: EmailData = {};
    const {
      swap,
      hostAddr: hostAddrUpper,
      isBuyer,
      swapId,
      assetType,
    } = event.returnValues as CreateReturnValue;
    const hostAddr = hostAddrUpper.toLowerCase();
    const swapAddr = swap.toLowerCase();
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
    const premiumInterval = 60 * 60 * 24 * 7 * 4;
    const totalPremiumRounds = await this.getRounds(+swapId);

    try {
      let user = await this.manager.findOneBy(Users, {
        address: hostAddr,
      });
      if (!user) {
        console.log('** no such user **');
        user = new Users();
        user.address = hostAddr;
        user.nickname = this.defaultNickName + '_' + hostAddr.slice(2, 7);
        user.soldCount = 0;
        user.boughtCount = 0;
        user.createdAt = currentTime;
        user.updatedAt = currentTime;
        await this.manager.save(user);
      } else {
        if (user.email) {
          emailData.recipient = user.email;
          emailData.nickname = user.nickname;
          emailData.event = event.event;
          emailData.timestamp = currentTime.toString();
          emailData.swapId = swapId;
          emailData.isBuyer = isBuyer;
          emailData.txHash = event.transactionHash;
          emailData.subject = `CDS - ${event.event.toUpperCase()} Event on swap #${
            emailData.swapId
          } Notification`;
          emailData.message = createMessage(emailData);
        }
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
        if (assetType === '0') {
          swap.assetType = 'bitcoin';
        } else if (assetType === '1') {
          swap.assetType = 'ether';
        } else if (assetType === '2') {
          swap.assetType = 'link';
        } else {
          swap.assetType = 'unregistered asset';
        }

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
      if (isLive) {
        console.log('sending create noficiation email');
        sendEmail(emailData.subject, emailData.message, emailData.recipient);
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async acceptEventHandler(event: EventData, isLive: boolean = true) {
    const { swapId } = event.returnValues as AcceptReturnValue;
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

      await this.handleSeller(sellerAddr, event, currentTime, isLive);
      await this.handleBuyer(buyerAddr, event, currentTime, isLive);

      swap.status = 'active';
      swap.seller = sellerAddr;
      swap.buyer = buyerAddr;
      await this.manager.save(swap);
      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async cancelEventHandler(event: EventData, isLive: boolean = true) {
    const { swapId } = event.returnValues as OtherReturnValue;
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

  private async claimEventHandler(event: EventData, isLive: boolean = true) {
    const { swapId } = event.returnValues as ClaimReturnValue;
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

      const seller = await this.manager.findOneBy(Users, {
        address: swap.seller,
      });
      if (seller.email && isLive) {
        const emailData: EmailData = {};
        emailData.recipient = seller.email;
        emailData.nickname = seller.nickname;
        emailData.event = event.event;
        emailData.timestamp = currentTime.toString();
        emailData.swapId = event.returnValues.swapId;
        emailData.isBuyer = false;
        emailData.txHash = event.transactionHash;
        emailData.subject = `CDS - ${event.event.toUpperCase()} Event on swap #${
          emailData.swapId
        } Notification`;
        emailData.message = createMessage(emailData);
        sendEmail(emailData.subject, emailData.message, emailData.recipient);
      }

      const buyer = await this.manager.findOneBy(Users, {
        address: swap.buyer,
      });
      if (buyer.email && isLive) {
        const emailData: EmailData = {};
        emailData.recipient = buyer.email;
        emailData.nickname = buyer.nickname;
        emailData.event = event.event;
        emailData.timestamp = currentTime.toString();
        emailData.swapId = event.returnValues.swapId;
        emailData.isBuyer = true;
        emailData.txHash = event.transactionHash;
        emailData.subject = `CDS - ${event.event.toUpperCase()} Event on swap #${
          emailData.swapId
        } Notification`;
        emailData.message = createMessage(emailData);
        sendEmail(emailData.subject, emailData.message, emailData.recipient);
      }

      await this.manager.save(swap);
      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async closeEventHandler(event: EventData, isLive: boolean = true) {
    const { swapId } = event.returnValues as OtherReturnValue;
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

  private async expireEventHandler(event: EventData, isLive: boolean = true) {
    const { swapId } = event.returnValues as OtherReturnValue;
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
      swap.updatedAt = currentTime;
      swap.terminatedAt = currentTime;
      swap.status = 'expired';
      await this.manager.save(swap);
      await this.txController(event, currentTime, swapId);
    } catch (error) {
      console.error(error);
    }
  }

  private async payPremiumEventHandler(
    event: EventData,
    isLive: boolean = true,
  ) {
    const { swapId } = event.returnValues as OtherReturnValue;
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
  private async handleSeller(
    sellerAddr: string,
    event: EventData,
    currentTime: number,
    isLive: boolean,
  ) {
    let seller = await this.manager.findOneBy(Users, {
      address: sellerAddr,
    });
    if (!seller) {
      console.log('** no such user, creating**');
      seller = new Users();
      seller.address = sellerAddr;
      seller.nickname = this.defaultNickName + '_' + sellerAddr.slice(2, 7);
      seller.soldCount = 1;
      seller.boughtCount = 0;
      seller.lastBought = null;
      seller.lastSold = currentTime;
      seller.createdAt = currentTime;
      seller.updatedAt = currentTime;
      this.manager.save(seller);
    } else {
      if (seller.email && isLive) {
        const emailData: EmailData = {};
        emailData.recipient = seller.email;
        emailData.nickname = seller.nickname;
        emailData.event = event.event;
        emailData.timestamp = currentTime.toString();
        emailData.swapId = event.returnValues.swapId;
        emailData.isBuyer = false;
        emailData.txHash = event.transactionHash;
        emailData.subject = `CDS - ${event.event.toUpperCase()} Event on swap #${
          emailData.swapId
        } Notification`;
        emailData.message = createMessage(emailData);
        sendEmail(emailData.subject, emailData.message, emailData.recipient);
      }
      seller.soldCount++;
      seller.lastSold = currentTime;
      seller.updatedAt = currentTime;
      await this.manager.save(seller);
    }
  }

  // TODO refactor
  private async handleBuyer(
    buyerAddr: string,
    event: EventData,
    currentTime: number,
    isLive: boolean,
  ) {
    let buyer = await this.manager.findOneBy(Users, {
      address: buyerAddr,
    });
    if (!buyer) {
      console.log('** no such user, creating**');
      buyer = new Users();
      buyer.address = buyerAddr;
      buyer.nickname = this.defaultNickName + '_' + buyerAddr.slice(2, 7);
      buyer.soldCount = 0;
      buyer.boughtCount = 1;
      buyer.lastBought = currentTime;
      buyer.lastSold = null;
      buyer.createdAt = currentTime;
      buyer.updatedAt = currentTime;
      this.manager.save(buyer);
    } else {
      if (buyer.email && isLive) {
        const emailData: EmailData = {};
        emailData.recipient = buyer.email;
        emailData.nickname = buyer.nickname;
        emailData.event = event.event;
        emailData.timestamp = currentTime.toString();
        emailData.swapId = event.returnValues.swapId;
        emailData.isBuyer = true;
        emailData.txHash = event.transactionHash;
        emailData.subject = `CDS - ${event.event.toUpperCase()} Event on swap #${
          emailData.swapId
        } Notification`;
        emailData.message = createMessage(emailData);
        sendEmail(emailData.subject, emailData.message, emailData.recipient);
      }
      buyer.boughtCount++;
      buyer.lastBought = currentTime;
      buyer.updatedAt = currentTime;
      await this.manager.save(buyer);
    }
  }
  private createOrUpdateTransaction(): any {}
  private createOrUpdateSwap(): any {}
}
