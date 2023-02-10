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
const inputValidators_1 = require("../utils/inputValidators");
const data_source_1 = require("../data-source");
const Users_1 = require("../entities/Users");
const userRepository = data_source_1.AppDataSource.getRepository(Users_1.Users);
const userController = {
    postMine: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, nickname } = req.body;
        if (!(0, inputValidators_1.isValidEmail)(email) && !nickname) {
            return res.status(403).json('Neither email nor nickname provided');
        }
        const address = yield redisClient_1.default.get(req.cookies.sessionID);
        const user = yield userRepository.findOneBy({ address });
        if (!user)
            return res.status(403).json('no such user');
        if ((0, inputValidators_1.isValidEmail)(email))
            user.email = email;
        if (nickname)
            user.nickname = nickname;
        yield userRepository.save(user);
        return res.status(200).json('User Update Successful');
    }),
    getMine: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = yield redisClient_1.default.get(req.cookies.sessionID);
            const user = yield userRepository.findOneBy({ address });
            if (!user)
                return res.status(404).json('no such user');
            return res.status(200).json(user);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getByAddress: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const address = req.params.address;
            const singleUser = yield userRepository.findOneBy({ address });
            return res.status(200).json(singleUser);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
    getAll: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield userRepository.find({});
            return res.status(200).json(allUsers);
        }
        catch (err) {
            console.error(err);
            next(err);
        }
    }),
};
exports.default = userController;
//# sourceMappingURL=userControllers.js.map