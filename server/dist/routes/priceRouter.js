"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const priceController_1 = __importDefault(require("../controllers/priceController"));
const priceRouter = express_1.default.Router();
priceRouter.get('/coingecko', priceController_1.default.getCoinGecko);
priceRouter.get('/chainlink', priceController_1.default.getChainLink);
exports.default = priceRouter;
//# sourceMappingURL=priceRouter.js.map