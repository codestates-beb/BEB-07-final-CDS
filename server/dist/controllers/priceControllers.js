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
const priceController = {
    getCoinGecko: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let cached = yield redisClient_1.default.get('geckoPrices');
            return res.status(200).json(JSON.parse(cached));
        }
        catch (err) {
            return res.status(500).json({
                message: 'Price feed outdated more than 1hr and not automatically updated, contact admin',
            });
        }
    }),
    getChainLink: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let cached = yield redisClient_1.default.get('linkPrices');
            return res.status(200).json(JSON.parse(cached));
        }
        catch (err) {
            return res.status(500).json({
                message: 'Price feed outdated more than 1hr and not automatically updated, contact admin',
            });
        }
    }),
};
exports.default = priceController;
//# sourceMappingURL=priceControllers.js.map