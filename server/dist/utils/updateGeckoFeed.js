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
const axios_1 = __importDefault(require("axios"));
const getEnv_1 = __importDefault(require("./getEnv"));
const redisClient_1 = __importDefault(require("./redisClient"));
const geckoEndpoint = (0, getEnv_1.default)('GECKO_ENDPOINT', 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,chainlink&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true&precision=2');
function updateGeckoFeed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const apiData = yield axios_1.default.get(geckoEndpoint);
            const priceData = apiData.data;
            priceData.bitcoin.usd_24h_change =
                +priceData.bitcoin.usd_24h_change.toFixed(3);
            priceData.ethereum.usd_24h_change =
                +priceData.ethereum.usd_24h_change.toFixed(3);
            priceData.chainlink.usd_24h_change =
                +priceData.chainlink.usd_24h_change.toFixed(3);
            yield redisClient_1.default.set('geckoPrices', JSON.stringify(priceData), 'EX', 60 * 60);
            console.log('Gecko Price Feed updated');
        }
        catch (err) {
            console.log('Error while updating Gecko price feed');
            console.error(err);
        }
    });
}
exports.default = updateGeckoFeed;
//# sourceMappingURL=updateGeckoFeed.js.map