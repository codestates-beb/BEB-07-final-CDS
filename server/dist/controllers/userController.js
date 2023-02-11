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
const redisClient_1 = __importDefault(require("../utils/redisClient"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const inputValidators_1 = require("../utils/inputValidators");
const data_source_1 = require("../data-source");
const Users_1 = require("../entities/Users");
const Swaps_1 = require("../entities/Swaps");
const Transactions_1 = require("../entities/Transactions");
const userRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
const swapRepository = data_source_1.AppDataSource.getRepository(Swaps_1.Swaps);
const transactionRepository = data_source_1.AppDataSource.getRepository(Transactions_1.Transactions);
const userController = {
    postMine: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, nickname } = req.body;
        if (!(0, inputValidators_1.isValidEmail)(email) && !nickname) {
            return res.status(403).json('Neither email nor nickname provided');
        }
        const address = yield redisClient_1.default.get(req.cookies.sessionID);
        const user = yield userRepository.findOneBy({ address });
        let isNewEmail = false;
        if (!user)
            return res.status(403).json('no such user');
        if (user.email !== email)
            isNewEmail = true;
        if ((0, inputValidators_1.isValidEmail)(email))
            user.email = email;
        if (nickname)
            user.nickname = nickname;
        if (isNewEmail) {
            (0, sendMail_1.default)('CDS : Email registered!', `hello ${user.nickname}, we just registered your email.\nFrom now on, you can subscribe valuable notifications from us.`, user.email);
        }
        const result = { email: user.email, nickname: user.nickname };
        yield userRepository.save(user);
        return res.status(200).json(result);
    }),
    getMine: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = yield redisClient_1.default.get(req.cookies.sessionID);
            const user = yield userRepository.findOneBy({ address });
            if (!user)
                return res.status(404).json('no such user');
            return res.status(200).json(user);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getMySwaps: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const address = yield redisClient_1.default.get(req.cookies.sessionID);
        const user = yield userRepository.findOneBy({ address });
        if (!user)
            return res.status(403).json('no such user');
        try {
            let mySwaps = yield swapRepository.findAndCount({
                where: [{ seller: address }, { buyer: address }],
            });
            const result = {
                address: address,
                totalSwapCount: mySwaps[1],
                swaps: mySwaps[0],
            };
            return res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getMyTransactions: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = yield redisClient_1.default.get(req.cookies.sessionID);
            const user = yield userRepository.findOneBy({ address });
            if (!user)
                return res.status(403).json('no such user');
            let txQuery = transactionRepository
                .createQueryBuilder('transactions')
                .select('transactions')
                .innerJoin(Swaps_1.Swaps, 'swaps', 'swaps.swapId = transactions.swapId')
                .innerJoin(Users_1.Users, 'users', 'users.address = swaps.seller OR users.address = swaps.buyer')
                .where(`users.address = "${address}"`);
            const result = yield txQuery.getManyAndCount();
            return res.status(200).json({
                address,
                totaltransactionCount: result[1],
                transactions: result[0],
            });
        }
        catch (err) {
            console.error(err);
            return next(err);
        }
    }),
    getByAddress: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = req.params.address;
            const user = yield userRepository.findOneBy({ address });
            if (!user)
                return res.status(403).json('no such user');
            return res.status(200).json(user);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getSwapByAddress: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = req.params.address;
            const user = yield userRepository.findOneBy({ address });
            if (!user)
                return res.status(403).json('no such user');
            let swaps = yield swapRepository.findAndCount({
                where: [{ seller: address }, { buyer: address }],
            });
            const result = {
                address: address,
                totalSwapCount: swaps[1],
                swaps: swaps[0],
            };
            return res.status(200).json(result);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getTransactionsByAddress: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = req.params.address;
            const user = yield userRepository.findOneBy({ address });
            if (!user)
                return res.status(403).json('no such user');
            let txQuery = transactionRepository
                .createQueryBuilder('transactions')
                .select('transactions')
                .innerJoin(Swaps_1.Swaps, 'swaps', 'swaps.swapId = transactions.swapId')
                .innerJoin(Users_1.Users, 'users', 'users.address = swaps.seller OR users.address = swaps.buyer')
                .where(`users.address = "${address}"`);
            const result = yield txQuery.getManyAndCount();
            return res.status(200).json({
                address,
                totaltransactionCount: result[1],
                transactions: result[0],
            });
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield userRepository.find({});
            return res.status(200).json(allUsers);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
};
exports.default = userController;
//# sourceMappingURL=userController.js.map