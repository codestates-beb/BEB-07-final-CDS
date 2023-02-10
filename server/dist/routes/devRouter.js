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
const express_1 = __importDefault(require("express"));
const redisClient_1 = __importDefault(require("../utils/redisClient"));
const data_source_1 = require("../data-source");
const Users_1 = require("../entities/Users");
const Swaps_1 = require("../entities/Swaps");
const Transactions_1 = require("../entities/Transactions");
const userRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
const swapRepository = data_source_1.AppDataSource.getRepository(Swaps_1.Swaps);
const transactionRepository = data_source_1.AppDataSource.getRepository(Transactions_1.Transactions);
const devRouter = express_1.default.Router();
devRouter.get('/swaps', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allSwaps = yield swapRepository.find({});
        return res.status(200).json(allSwaps);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
devRouter.get('/swaps/:swapId', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const swapId = +req.params.swapId;
        const singleSwap = yield swapRepository.findOneBy({ swapId });
        return res.status(200).json(singleSwap);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
devRouter.get('/users', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allUsers = yield userRepository.find({});
        return res.status(200).json(allUsers);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
devRouter.get('/users/:address', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = req.params.address;
        const singleUser = yield userRepository.findOneBy({ address });
        return res.status(200).json(singleUser);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
devRouter.get('/transactions', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTransactions = yield transactionRepository.find({});
        return res.status(200).json(allTransactions);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
devRouter.get('/transactions/:txHash', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const txHash = req.params.txHash;
        const singleTransaction = yield transactionRepository.findOneBy({ txHash });
        return res.status(200).json(singleTransaction);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
devRouter.get('/prices/coingecko', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cached = yield redisClient_1.default.get('geckoPrices');
        return res.status(200).json(JSON.parse(cached));
    }
    catch (err) {
        return res.status(500).json({
            message: 'Price feed outdated more than 1hr and not automatically updated contact admin',
        });
    }
}));
devRouter.get('/prices/chainlink', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cached = yield redisClient_1.default.get('linkPrices');
        return res.status(200).json(JSON.parse(cached));
    }
    catch (err) {
        return res.status(500).json({
            message: 'Price feed outdated more than 1hr and not automatically updated contact admin',
        });
    }
}));
devRouter.get('/users');
devRouter.get('/transactions');
devRouter.get('/transactions/:txhash');
devRouter.get('/oracle/:assetType');
exports.default = devRouter;
//# sourceMappingURL=devRouter.js.map