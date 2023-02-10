"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginChecker_1 = require("../middlewares/loginChecker");
const userController_1 = __importDefault(require("../controllers/userController"));
const userRouter = express_1.default.Router();
userRouter.post('/my', loginChecker_1.isLoggedIn, userController_1.default.postMine);
userRouter.get('/my', loginChecker_1.isLoggedIn, userController_1.default.getMine);
userRouter.get('/my/transactions', loginChecker_1.isLoggedIn, userController_1.default.getMyTransactions);
userRouter.get('/my/swaps', loginChecker_1.isLoggedIn, userController_1.default.getMySwaps);
userRouter.get('/:address', userController_1.default.getByAddress);
userRouter.get('/:address/swaps', userController_1.default.getSwapByAddress);
userRouter.get('/:address/transactions', userController_1.default.getTransactionsByAddress);
userRouter.get('/', userController_1.default.getAll);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map