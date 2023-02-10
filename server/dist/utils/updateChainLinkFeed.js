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
const redisClient_1 = __importDefault(require("./redisClient"));
const web3_1 = __importDefault(require("web3"));
const getEnv_1 = __importDefault(require("../utils/getEnv"));
const Consumer_json_1 = __importDefault(require("./Consumer.json"));
const CONSUMER_CA = (0, getEnv_1.default)('CONSUMER_CA');
const GOERLI_HTTP = (0, getEnv_1.default)('GOERLI_HTTP');
const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(GOERLI_HTTP));
const consumer = new web3.eth.Contract(Consumer_json_1.default, CONSUMER_CA);
function getPricesFromChainLink() {
    return __awaiter(this, void 0, void 0, function* () {
        const BTC = yield consumer.methods.getLatestBTCPrice().call();
        const ETH = yield consumer.methods.getLatestETHPrice().call();
        const LINK = yield consumer.methods.getLatestLINKPrice().call();
        const result = { BTC, ETH, LINK };
        return result;
    });
}
function updateChainLinkFeed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const priceData = yield getPricesFromChainLink();
            const bitcoin = {
                usd: +(+priceData.BTC / 1e8).toFixed(2),
                last_updated_at: new Date().getTime(),
            };
            const ethereum = {
                usd: +(+priceData.ETH / 1e8).toFixed(2),
                last_updated_at: new Date().getTime(),
            };
            const chainlink = {
                usd: +(+priceData.LINK / 1e8).toFixed(2),
                last_updated_at: new Date().getTime(),
            };
            const prices = { bitcoin, ethereum, chainlink };
            yield redisClient_1.default.set('linkPrices', JSON.stringify(prices), 'EX', 60 * 60);
            console.log('Chain Link Price Feed updated');
        }
        catch (err) {
            console.log('Error while updating Chain Link price feed');
            console.error(err);
        }
    });
}
exports.default = updateChainLinkFeed;
//# sourceMappingURL=updateChainLinkFeed.js.map