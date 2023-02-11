"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
const Swap_json_1 = require("./contractArtifacts/Swap.json");
const Users_1 = require("./entities/Users");
const Transactions_1 = require("./entities/Transactions");
const Swaps_1 = require("./entities/Swaps");
const Swap_1 = __importDefault(require("./Swap"));
class CDS {
    constructor(webSocketURI, manager) {
        this.contract = null;
        this.web3 = null;
        this.manager = null;
        this.fromBlock = 0;
        this.defaultNickName = 'anonymous';
        this.web3 = new web3_1.default(webSocketURI);
        this.web3Endpoint = webSocketURI;
        this.manager = manager;
    }
    static getInstance(webSocketURI, manager) {
        if (!CDS.instance) {
            CDS.instance = new CDS(webSocketURI, manager);
        }
        else {
            CDS.instance.web3 = new web3_1.default(webSocketURI);
        }
        return CDS.instance;
    }
    setContract(abi, address) {
        return __awaiter(this, void 0, void 0, function* () {
            this.contract = new this.web3.eth.Contract(abi, address);
            const ContractName = yield this.contract.events;
            if (ContractName.length === 0) {
                throw new Error('Invalid Contract');
            }
            return this.contract;
        });
    }
    getContract() {
        if (!this.contract) {
            throw new Error('contract not set!');
        }
        return this.contract;
    }
    removeContract() {
        if (!this.contract) {
            throw new Error('contract not set!');
        }
        this.contract = null;
    }
    setFromBlock(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield this.web3.eth.getTransaction(txHash);
            if (transaction) {
                this.fromBlock = transaction.blockNumber;
            }
            return;
        });
    }
    getTxTimestamp(txHash) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tx = yield this.web3.eth.getTransaction(txHash);
                const blockInfo = yield this.web3.eth.getBlock(tx.blockNumber);
                return blockInfo.timestamp;
            }
            catch (error) {
                console.error(error);
                return 0;
            }
        });
    }
    isTxProcessed(transactionHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.manager.findOneBy(Transactions_1.Transactions, {
                txHash: transactionHash,
            });
        });
    }
    getPastEvents() {
        var _a, e_1, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const allEvents = yield this.contract.getPastEvents('allEvents', {
                fromBlock: this.fromBlock,
                toBlock: 'latest',
            });
            try {
                for (var _d = true, allEvents_1 = __asyncValues(allEvents), allEvents_1_1; allEvents_1_1 = yield allEvents_1.next(), _a = allEvents_1_1.done, !_a;) {
                    _c = allEvents_1_1.value;
                    _d = false;
                    try {
                        let event = _c;
                        const { transactionHash } = event;
                        if (yield this.isTxProcessed(transactionHash))
                            continue;
                        if (event.event === 'Create') {
                            console.log('Create Event found!');
                            yield this.createEventHandler(event);
                        }
                        else if (event.event === 'Accept') {
                            console.log('Accept Event found!');
                            yield this.acceptEventHandler(event);
                        }
                        else if (event.event === 'Cancel') {
                            console.log('Cancel Event found!');
                            yield this.cancelEventHandler(event);
                        }
                        else if (event.event === 'Claim') {
                            console.log('Claim Event found!');
                            yield this.claimEventHandler(event);
                        }
                        else if (event.event === 'Close') {
                            console.log('Close Event found!');
                            yield this.closeEventHandler(event);
                        }
                        else if (event.event === 'Expire') {
                            console.log('##################');
                            console.log('Expire Event found!');
                            console.log('##################');
                            yield this.expireEventHandler(event);
                        }
                        else if (event.event === 'PayPremium') {
                            console.log('PayPremium Event found!');
                            yield this.payPremiumEventHandler(event);
                        }
                        else if (event.event === 'OwnershipTransferred') {
                            console.log('OwnershipTransferred found!');
                            const admin = event.returnValues.newOwner;
                            console.log(`Contract Admin addr is : ${admin}`);
                            let user = yield this.manager.findOneBy(Users_1.Users, {
                                address: admin,
                            });
                            const currentTime = yield this.getTxTimestamp(event.transactionHash);
                            if (!user) {
                                console.log('** admin not registered, registering admin**');
                                user = new Users_1.Users();
                                user.address = admin;
                                user.nickname = 'admin';
                                user.soldCount = 0;
                                user.boughtCount = 0;
                                user.createdAt = currentTime;
                                user.updatedAt = currentTime;
                                yield this.manager.save(user);
                            }
                            else {
                                console.log('** admin user found! **');
                            }
                        }
                        else {
                            console.error(event);
                            console.error(`Not specified Event ${event}, ${event.event} : ${event.returnValues}`);
                        }
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = allEvents_1.return)) yield _b.call(allEvents_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            console.log('** DB synchronized with all past events **');
        });
    }
    subEvents() {
        if (!this.contract) {
            throw new Error('contract not set!');
        }
        this.contract.events
            .Create({}, (err, event) => {
            console.log('**Create Swap Emitted**');
        })
            .on('data', (event) => __awaiter(this, void 0, void 0, function* () {
            console.log(`** Create Swap Emitted ${event.transactionHash} **`);
            yield this.createEventHandler(event);
        }));
        this.contract.events
            .Accept({}, (err, event) => {
            console.log(`** Accept Swap Emitted ${event.transactionHash} **`);
        })
            .on('data', (event) => __awaiter(this, void 0, void 0, function* () {
            yield this.acceptEventHandler(event);
        }));
        this.contract.events
            .Cancel({}, (err, event) => {
            console.log(`** Cancel Swap Emitted ${event.transactionHash} **`);
        })
            .on('data', (event) => __awaiter(this, void 0, void 0, function* () {
            yield this.cancelEventHandler(event);
        }));
        this.contract.events
            .Claim({}, (err, event) => {
            console.log(`** ClaimSwap  Emitted ${event.transactionHash} **`);
        })
            .on('data', (event) => __awaiter(this, void 0, void 0, function* () {
            yield this.claimEventHandler(event);
        }));
        this.contract.events
            .Close({}, (err, event) => {
            console.log(`** Close Swap Emitted ${event.transactionHash} **`);
        })
            .on('data', (event) => __awaiter(this, void 0, void 0, function* () {
            yield this.closeEventHandler(event);
        }));
        this.contract.events
            .Expire({}, (err, event) => {
            console.log(`** Expire Swap Emitted ${event.transactionHash} **`);
        })
            .on('data', (event) => __awaiter(this, void 0, void 0, function* () {
            yield this.expireEventHandler(event);
        }));
        this.contract.events
            .PayPremium({}, (err, event) => {
            console.log(`** PayPremium Swap Emitted ${event.transactionHash} **`);
        })
            .on('data', (event) => __awaiter(this, void 0, void 0, function* () {
            yield this.payPremiumEventHandler(event);
        }));
    }
    // get detailed swapinfo from Swap.sol
    getSwapInfo(swapAddr) {
        return __awaiter(this, void 0, void 0, function* () {
            const swapInstance = Swap_1.default.getInstance(this.web3Endpoint);
            swapInstance.setContract(Swap_json_1.abi, swapAddr);
            const swapInfo = yield swapInstance.getSwapInfo();
            return swapInfo;
        });
    }
    getSwapAddr(swapId) {
        return __awaiter(this, void 0, void 0, function* () {
            const swapAddr = yield this.contract.methods.getSwap(swapId).call();
            return swapAddr;
        });
    }
    getBuyer(swapId) {
        return __awaiter(this, void 0, void 0, function* () {
            const buyerInfo = yield this.contract.methods
                .getBuyer(swapId)
                .call();
            return buyerInfo;
        });
    }
    getSeller(swapId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sellerInfo = yield this.contract.methods
                .getSeller(swapId)
                .call();
            return sellerInfo;
        });
    }
    getInterval(swapId) {
        return __awaiter(this, void 0, void 0, function* () {
            const intervalInfo = yield this.contract.methods.getInterval(swapId).call();
            return intervalInfo;
        });
    }
    getRounds(swapId) {
        return __awaiter(this, void 0, void 0, function* () {
            const roundsInfo = yield this.contract.methods.getRounds(swapId).call();
            return roundsInfo;
        });
    }
    createEventHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { swap, hostAddr: hostAddrUpper, isBuyer, swapId, assetType, } = event.returnValues;
            const hostAddr = hostAddrUpper.toLowerCase();
            const swapAddr = swap.toLowerCase();
            const { initAssetPrice, claimPrice, liquidationPrice, premium, sellerDeposit, seller, buyer, } = yield this.getSwapInfo(swapAddr);
            const amountOfAssets = +sellerDeposit / (+initAssetPrice - +liquidationPrice);
            const currentTime = yield this.getTxTimestamp(event.transactionHash);
            const buyerDeposit = 3 * +premium;
            const premiumInterval = 60 * 60 * 24 * 7 * 4;
            const totalPremiumRounds = yield this.getRounds(+swapId);
            try {
                let user = yield this.manager.findOneBy(Users_1.Users, {
                    address: hostAddr,
                });
                if (!user) {
                    console.log('** no such user **');
                    user = new Users_1.Users();
                    user.address = hostAddr;
                    user.nickname = this.defaultNickName + '_' + hostAddr.slice(2, 7);
                    user.soldCount = 0;
                    user.boughtCount = 0;
                    user.createdAt = currentTime;
                    user.updatedAt = currentTime;
                    yield this.manager.save(user);
                }
                else {
                    console.log('** user found! **');
                    user.updatedAt = currentTime;
                    yield this.manager.save(user);
                }
                let swap = yield this.manager.findOneBy(Swaps_1.Swaps, {
                    swapId: +swapId,
                });
                if (!swap) {
                    // emitted variables
                    swap = new Swaps_1.Swaps();
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
                    }
                    else if (assetType === '1') {
                        swap.assetType = 'ether';
                    }
                    else if (assetType === '2') {
                        swap.assetType = 'link';
                    }
                    else {
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
                    yield this.manager.save(swap);
                }
                yield this.txController(event, currentTime, swapId);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    acceptEventHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { swapId } = event.returnValues;
            const swapAddr = (yield this.getSwapAddr(swapId)).toLowerCase();
            const swapInfo = yield this.getSwapInfo(swapAddr);
            const buyerAddr = swapInfo.buyer.toLowerCase();
            const sellerAddr = swapInfo.seller.toLowerCase();
            const currentTime = yield this.getTxTimestamp(event.transactionHash);
            try {
                let transaction = yield this.manager.findOneBy(Transactions_1.Transactions, {
                    txHash: event.transactionHash,
                });
                if (transaction)
                    throw new Error('This transaction already processed');
                let swap = yield this.manager.findOneBy(Swaps_1.Swaps, {
                    swapId: +swapId,
                });
                if (!swap)
                    throw new Error(`swapId ${swapId} is not on database`);
                yield this.handleSeller(sellerAddr, currentTime);
                yield this.handleBuyer(buyerAddr, currentTime);
                swap.status = 'active';
                swap.seller = sellerAddr;
                swap.buyer = buyerAddr;
                yield this.manager.save(swap);
                yield this.txController(event, currentTime, swapId);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    cancelEventHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { swapId } = event.returnValues;
            const currentTime = yield this.getTxTimestamp(event.transactionHash);
            try {
                let transaction = yield this.manager.findOneBy(Transactions_1.Transactions, {
                    txHash: event.transactionHash,
                });
                if (transaction)
                    throw new Error('This transaction already processed');
                let swap = yield this.manager.findOneBy(Swaps_1.Swaps, {
                    swapId: +swapId,
                });
                if (!swap)
                    throw new Error(`swapId ${swapId} is not on database`);
                swap.status = 'inactive';
                swap.updatedAt = currentTime;
                swap.terminatedAt = currentTime;
                yield this.manager.save(swap);
                yield this.txController(event, currentTime, swapId);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    claimEventHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { swapId } = event.returnValues;
            const currentTime = yield this.getTxTimestamp(event.transactionHash);
            try {
                let transaction = yield this.manager.findOneBy(Transactions_1.Transactions, {
                    txHash: event.transactionHash,
                });
                if (transaction)
                    throw new Error('This transaction already processed');
                let swap = yield this.manager.findOneBy(Swaps_1.Swaps, {
                    swapId: +swapId,
                });
                if (!swap)
                    throw new Error(`swapId ${swapId} is not on database`);
                swap.status = 'claimed';
                swap.updatedAt = currentTime;
                swap.terminatedAt = currentTime;
                yield this.manager.save(swap);
                yield this.txController(event, currentTime, swapId);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    closeEventHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { swapId } = event.returnValues;
            const currentTime = yield this.getTxTimestamp(event.transactionHash);
            try {
                let transaction = yield this.manager.findOneBy(Transactions_1.Transactions, {
                    txHash: event.transactionHash,
                });
                if (transaction)
                    throw new Error('This transaction already processed');
                let swap = yield this.manager.findOneBy(Swaps_1.Swaps, {
                    swapId: +swapId,
                });
                if (!swap)
                    throw new Error(`swapId ${swapId} is not on database`);
                swap.status = 'inactive';
                swap.updatedAt = currentTime;
                swap.terminatedAt = currentTime;
                yield this.manager.save(swap);
                yield this.txController(event, currentTime, swapId);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    expireEventHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { swapId } = event.returnValues;
            const currentTime = yield this.getTxTimestamp(event.transactionHash);
            try {
                let transaction = yield this.manager.findOneBy(Transactions_1.Transactions, {
                    txHash: event.transactionHash,
                });
                if (transaction)
                    throw new Error('This transaction already processed');
                let swap = yield this.manager.findOneBy(Swaps_1.Swaps, {
                    swapId: +swapId,
                });
                if (!swap)
                    throw new Error(`swapId ${swapId} is not on database`);
                swap.updatedAt = currentTime;
                swap.terminatedAt = currentTime;
                swap.status = 'expired';
                yield this.manager.save(swap);
                yield this.txController(event, currentTime, swapId);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    payPremiumEventHandler(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const { swapId } = event.returnValues;
            const currentTime = yield this.getTxTimestamp(event.transactionHash);
            try {
                let transaction = yield this.manager.findOneBy(Transactions_1.Transactions, {
                    txHash: event.transactionHash,
                });
                if (transaction)
                    throw new Error('This transaction already processed');
                let swap = yield this.manager.findOneBy(Swaps_1.Swaps, {
                    swapId: +swapId,
                });
                if (!swap)
                    throw new Error(`swapId ${swapId} is not on database`);
                swap.remainPremiumRounds = swap.remainPremiumRounds - 1;
                swap.updatedAt = currentTime;
                swap.lastPaidAt = currentTime;
                yield this.manager.save(swap);
                yield this.txController(event, currentTime, swapId);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    userController(event) {
        return __awaiter(this, void 0, void 0, function* () { });
    } // TODO refactor
    swapController(event) {
        return __awaiter(this, void 0, void 0, function* () { });
    } // TODO refactor
    txController(event, currentTime, swapId) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = yield this.manager.findOneBy(Transactions_1.Transactions, {
                txHash: event.transactionHash,
            });
            if (!transaction) {
                console.log('** New Transaction **');
                transaction = new Transactions_1.Transactions();
                transaction.txHash = event.transactionHash;
                transaction.blockNum = event.blockNumber;
                transaction.event = event.event;
                transaction.swapId = +swapId;
                transaction.createdAt = currentTime;
                transaction.updatedAt = currentTime;
                yield this.manager.save(transaction);
            }
        });
    }
    // TODO refactor
    handleSeller(sellerAddr, currentTime) {
        return __awaiter(this, void 0, void 0, function* () {
            let seller = yield this.manager.findOneBy(Users_1.Users, {
                address: sellerAddr,
            });
            if (!seller) {
                console.log('** no such user, creating**');
                seller = new Users_1.Users();
                seller.address = sellerAddr;
                seller.nickname = this.defaultNickName + '_' + sellerAddr.slice(2, 7);
                seller.soldCount = 1;
                seller.boughtCount = 0;
                seller.lastBought = null;
                seller.lastSold = currentTime;
                seller.createdAt = currentTime;
                seller.updatedAt = currentTime;
                this.manager.save(seller);
            }
            else {
                console.log('** user found! **');
                seller.soldCount++;
                seller.lastSold = currentTime;
                seller.updatedAt = currentTime;
                yield this.manager.save(seller);
            }
        });
    }
    // TODO refactor
    handleBuyer(buyerAddr, currentTime) {
        return __awaiter(this, void 0, void 0, function* () {
            let buyer = yield this.manager.findOneBy(Users_1.Users, {
                address: buyerAddr,
            });
            if (!buyer) {
                console.log('** no such user, creating**');
                buyer = new Users_1.Users();
                buyer.address = buyerAddr;
                buyer.nickname = this.defaultNickName + '_' + buyerAddr.slice(2, 7);
                buyer.soldCount = 0;
                buyer.boughtCount = 1;
                buyer.lastBought = currentTime;
                buyer.lastSold = null;
                buyer.createdAt = currentTime;
                buyer.updatedAt = currentTime;
                this.manager.save(buyer);
            }
            else {
                console.log('** user found! **');
                buyer.boughtCount++;
                buyer.lastBought = currentTime;
                buyer.updatedAt = currentTime;
                yield this.manager.save(buyer);
            }
        });
    }
    createOrUpdateTransaction() { }
    createOrUpdateSwap() { }
}
exports.default = CDS;
//# sourceMappingURL=CDS.js.map