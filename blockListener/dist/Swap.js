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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const web3_1 = __importDefault(require("web3"));
// import { Transaction } from 'web3-core';
// import { abi as cdsAbi } from './contractArtifacts/CDS.json';
// import { swapAbi } from './contractArtifacts/Swap.json';
// import { EntityManager, TreeChildren } from 'typeorm';
// import { Users } from './entities/Users';
// import { Transactions } from './entities/Transactions';
// import { Swaps } from './entities/Swaps';
class Swap {
    constructor(websocketURI) {
        this.contract = null;
        this.web3 = null;
        this.web3 = new web3_1.default(websocketURI);
    }
    static getInstance(webSocketURI) {
        if (!Swap.instance) {
            Swap.instance = new Swap(webSocketURI);
        }
        else {
            Swap.instance.web3 = new web3_1.default(webSocketURI);
        }
        return Swap.instance;
    }
    setContract(abi, address) {
        this.contract = new this.web3.eth.Contract(abi, address);
        return this.contract;
    }
    getSwapInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            const [initAssetPrice, claimPrice, liquidationPrice, premium, sellerDeposit,] = yield this.getPrices();
            const buyer = yield this.getBuyer();
            const seller = yield this.getSeller();
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
        });
    }
    getPrices() {
        return __awaiter(this, void 0, void 0, function* () {
            const prices = yield this.contract.methods.getPrices().call();
            return prices;
        });
    }
    getBuyer() {
        return __awaiter(this, void 0, void 0, function* () {
            const buyer = yield this.contract.methods.getBuyer().call();
            return buyer;
        });
    }
    getSeller() {
        return __awaiter(this, void 0, void 0, function* () {
            const seller = yield this.contract.methods.getSeller().call();
            return seller;
        });
    }
}
exports.default = Swap;
//# sourceMappingURL=Swap.js.map