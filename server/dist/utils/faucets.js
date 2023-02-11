"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToken = exports.sendEther = void 0;
const web3_1 = __importDefault(require("web3"));
const getEnv_1 = __importDefault(require("./getEnv"));
const web3 = new web3_1.default((0, getEnv_1.default)('GETH_HTTP'));
const TOKEN_CA = '';
const ADMIN_PK = '';
function sendEther(address) {
    return;
}
exports.sendEther = sendEther;
function sendToken(address) {
    return;
}
exports.sendToken = sendToken;
//# sourceMappingURL=faucets.js.map