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
exports.SequelizeToTypeOrm1675407005234 = void 0;
const queries_1 = require("./queries");
class SequelizeToTypeOrm1675407005234 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(queries_1.createUsersTable);
            yield queryRunner.query(queries_1.createSwapsTable);
            yield queryRunner.query(queries_1.createTrasactionsTable);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE transactions`);
            yield queryRunner.query(`DROP TABLE swaps`);
            yield queryRunner.query(`DROP TABLE users`);
        });
    }
}
exports.SequelizeToTypeOrm1675407005234 = SequelizeToTypeOrm1675407005234;
//# sourceMappingURL=1675407005234-SequelizeToTypeOrm.js.map