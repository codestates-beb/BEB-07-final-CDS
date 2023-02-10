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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../data-source");
const Transactions_1 = require("../entities/Transactions");
const transactionRepository = data_source_1.AppDataSource.getRepository(Transactions_1.Transactions);
const transactionController = {
    getByTxHash: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const txHash = req.params.txHash;
            const singleTransaction = yield transactionRepository.findOneBy({
                txHash,
            });
            return res.status(200).json(singleTransaction);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield transactionRepository.find({});
            return res.status(200).json(allUsers);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
};
exports.default = transactionController;
//# sourceMappingURL=transactionControllers.js.map