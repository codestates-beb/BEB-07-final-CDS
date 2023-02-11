"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swapController_1 = __importDefault(require("../controllers/swapController"));
const swapRouter = express_1.default.Router();
swapRouter.get('/:swapId', swapController_1.default.getBySwapId);
swapRouter.get('/', swapController_1.default.getAll);
exports.default = swapRouter;
//# sourceMappingURL=swapRouter.js.map