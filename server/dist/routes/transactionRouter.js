"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transactionController_1 = __importDefault(require("../controllers/transactionController"));
const transactionRouter = express_1.default.Router();
transactionRouter.get('/:txHash', transactionController_1.default.getByTxHash);
transactionRouter.get('/', transactionController_1.default.getAll);
exports.default = transactionRouter;
//# sourceMappingURL=transactionRouter.js.map