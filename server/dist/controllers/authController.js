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
const eth_sig_util_1 = require("eth-sig-util");
const ethereumjs_util_1 = require("ethereumjs-util");
const redisClient_1 = __importDefault(require("../utils/redisClient"));
const sendMail_1 = __importDefault(require("../utils/sendMail"));
const data_source_1 = require("../data-source");
const Users_1 = require("../entities/Users");
const getNonce_1 = require("../utils/getNonce");
const inputValidators_1 = require("../utils/inputValidators");
const faucets_1 = require("../utils/faucets");
const cookieOptions = {
    sameSite: 'none',
    secure: true,
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
};
const userRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
const authController = {
    getNonce: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = req.query.address;
            if (!(0, inputValidators_1.isValidAddress)(address)) {
                res.status(403).json('You Must provide Valid Address to get Nonce');
            }
            let user = yield userRepository.findOneBy({ address });
            if (!user) {
                const currentTime = Math.floor(Date.now() / 1000);
                user = userRepository.create({
                    address: address,
                    boughtCount: 0,
                    soldCount: 0,
                    createdAt: currentTime,
                    updatedAt: currentTime,
                });
            }
            user.nonce = (0, getNonce_1.getNonce)();
            yield userRepository.save(user);
            return res.status(200).json({ nonce: user.nonce });
        }
        catch (err) {
            console.error(err);
            return next(err);
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { address, signature } = req.body;
            console.log(address, signature);
            if (!(0, inputValidators_1.isValidAddress)(address) || !signature) {
                return res
                    .status(403)
                    .json('You Must POST both valid address and signature');
            }
            const user = yield userRepository.findOneBy({ address });
            if (!user || !user.nonce) {
                return res.status(403).json('You Must ask for Nonce before logging in');
            }
            const nonce = user.nonce;
            user.nonce = null;
            const msgBufferHex = (0, ethereumjs_util_1.bufferToHex)(Buffer.from('sign: ' + nonce.toString()));
            const parsedAddress = (0, eth_sig_util_1.recoverPersonalSignature)({
                data: msgBufferHex,
                sig: signature,
            });
            console.log({ parsedAddress });
            if (parsedAddress.toLowerCase() !== address.toLowerCase()) {
                return res
                    .status(403)
                    .json('Login Failed : Signature from invalid address');
            }
            res.cookie('sessionID', req.sessionID, cookieOptions);
            yield redisClient_1.default.set(req.sessionID, address, 'EX', 60 * 60);
            if (user.email) {
                console.log('sending email : ', user.email);
                yield (0, sendMail_1.default)('CDS: You are logged in Now', `hello ${user.nickname}, you are now logged in`, user.email);
            }
            if (!user.lastEtherFaucet) {
                const currentTime = new Date().getTime();
                user.lastEtherFaucet = currentTime;
                user.lastTokenFaucet = currentTime;
                (0, faucets_1.sendEther)(user.address);
                (0, faucets_1.sendToken)(user.address);
            }
            yield userRepository.save(user);
            return res.status(200).json('Login Successful!');
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    logout: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield redisClient_1.default.del(req.cookies.sessionID);
            res.clearCookie('sessionID', cookieOptions);
            return res.status(200).json('Logout successful!');
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    verify: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = yield redisClient_1.default.get(req.cookies.sessionID);
            if (!address) {
                return res
                    .status(404)
                    .json('You Do NOT have valid login cookie, please login again');
            }
            const user = yield userRepository.findOneBy({ address });
            if (!user) {
                return res
                    .status(404)
                    .json('You Do NOT have valid login cookie, please login again');
            }
            // if correct login info, clear cookie and reissue
            res.clearCookie('sessionID');
            yield redisClient_1.default.del(req.cookies.sessionID);
            res.cookie('sessionID', req.sessionID, cookieOptions);
            yield redisClient_1.default.set(req.sessionID, address, 'EX', 60 * 60);
            return res.status(200).json('Login Successful!');
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
};
exports.default = authController;
//# sourceMappingURL=authController.js.map