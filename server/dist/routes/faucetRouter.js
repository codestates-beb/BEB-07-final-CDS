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
const express_1 = __importDefault(require("express"));
const loginChecker_1 = require("../middlewares/loginChecker");
const redisClient_1 = __importDefault(require("../utils/redisClient"));
const Users_1 = require("../entities/Users");
const data_source_1 = require("../data-source");
const faucets_1 = require("../utils/faucets");
const userRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
const faucetRouter = express_1.default.Router();
faucetRouter.get('/ether', loginChecker_1.isLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield redisClient_1.default.get(req.cookies.sessionID);
        const user = yield userRepository.findOneBy({ address });
        if (!user)
            return res.status(404).json('no such user');
        (0, faucets_1.sendEther)(address);
        return res.status(200).json({ message: 'Ether faucet activated' });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
faucetRouter.get('/token', loginChecker_1.isLoggedIn, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield redisClient_1.default.get(req.cookies.sessionID);
        const user = yield userRepository.findOneBy({ address });
        if (!user)
            return res.status(404).json('no such user');
        (0, faucets_1.sendToken)(address);
        return res.status(200).json({ message: 'Token faucet activated' });
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}));
exports.default = faucetRouter;
//# sourceMappingURL=faucetRouter.js.map