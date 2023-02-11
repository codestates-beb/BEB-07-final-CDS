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
const Swaps_1 = require("../entities/Swaps");
const Transactions_1 = require("../entities/Transactions");
const Users_1 = require("../entities/Users");
function clearDB(repos) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = AppDataSource.getRepository(Users_1.Users);
        const transactionRepository = AppDataSource.getRepository(Transactions_1.Transactions);
        const swapRepository = AppDataSource.getRepository(Swaps_1.Swaps);
        for (let repo in repos) {
            yield repo
                .createQueryBuilder()
                .delete()
                .from(Users_1.Users)
                .where('true=true')
                .execute()
                .then((log) => console.log('user table cleared : ', log));
            yield transactionRepository
                .createQueryBuilder()
                .delete()
                .from(Transactions_1.Transactions)
                .where('true=true')
                .execute()
                .then((log) => console.log('transaction table cleared : ', log));
            yield swapRepository
                .createQueryBuilder()
                .delete()
                .from(Swaps_1.Swaps)
                .where('true=true')
                .execute()
                .then((log) => console.log('swap table cleared : ', log));
        }
    });
}
//# sourceMappingURL=clearDB.js.map