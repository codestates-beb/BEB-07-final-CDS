"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = __importDefault(require("../controllers/authController"));
const loginChecker_1 = require("../middlewares/loginChecker");
const authRouter = express_1.default.Router();
authRouter.post('/login', loginChecker_1.isNotLoggedIn, authController_1.default.login);
authRouter.get('/logout', loginChecker_1.isLoggedIn, authController_1.default.logout);
authRouter.get('/nonce', loginChecker_1.isNotLoggedIn, authController_1.default.getNonce);
authRouter.get('/verify', loginChecker_1.isLoggedIn, authController_1.default.verify);
exports.default = authRouter;
//# sourceMappingURL=authRouter.js.map