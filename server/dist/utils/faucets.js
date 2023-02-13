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
exports.sendToken = exports.sendEther = void 0;
const web3_1 = __importDefault(require("web3"));
const getEnv_1 = __importDefault(require("./getEnv"));
const FUSD_json_1 = require("../contractArtifacts/FUSD.json");
const web3 = new web3_1.default((0, getEnv_1.default)('GETH_HTTP'));
const FUSD_CA = (0, getEnv_1.default)('FUSD_CA');
const fusd = new web3.eth.Contract(FUSD_json_1.abi, FUSD_CA);
const adminAccount = web3.eth.accounts.privateKeyToAccount((0, getEnv_1.default)('ADMIN_PK'));
const ADMIN_PASSWORD = (0, getEnv_1.default)('ADMIN_PASSWORD');
const etherAmount = 5 * 1e18;
const tokenAmount = '500000';
function sendEther(address) {
    return __awaiter(this, void 0, void 0, function* () {
        web3.eth.personal.sendTransaction({
            from: adminAccount.address,
            gasPrice: '20000000000',
            gas: '21000',
            to: address,
            value: etherAmount,
            data: '',
        }, ADMIN_PASSWORD);
    });
}
exports.sendEther = sendEther;
function sendToken(address) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fusd.methods.transfer(address, tokenAmount).send({
            from: adminAccount.address,
        });
    });
}
exports.sendToken = sendToken;
//# sourceMappingURL=faucets.js.map