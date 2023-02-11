"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authRouter_1 = __importDefault(require("./authRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const swapRouter_1 = __importDefault(require("./swapRouter"));
const transactionRouter_1 = __importDefault(require("./transactionRouter"));
const priceRouter_1 = __importDefault(require("./priceRouter"));
const faucetRouter_1 = __importDefault(require("./faucetRouter"));
exports.default = {
    authRouter: authRouter_1.default,
    userRouter: userRouter_1.default,
    swapRouter: swapRouter_1.default,
    transactionRouter: transactionRouter_1.default,
    priceRouter: priceRouter_1.default,
    faucetRouter: faucetRouter_1.default,
};
//# sourceMappingURL=index.js.map