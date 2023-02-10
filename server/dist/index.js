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
const data_source_1 = require("./data-source");
const updateGeckoFeed_1 = __importDefault(require("./utils/updateGeckoFeed"));
const updateChainLinkFeed_1 = __importDefault(require("./utils/updateChainLinkFeed"));
const app_1 = __importDefault(require("./app"));
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    app_1.default.listen(app_1.default.get('port'), () => {
        (0, updateChainLinkFeed_1.default)();
        (0, updateGeckoFeed_1.default)();
        setInterval(() => {
            (0, updateChainLinkFeed_1.default)();
            (0, updateGeckoFeed_1.default)();
        }, 20 * 1000);
        console.log(`Server is running at ${app_1.default.get('port')}`);
    });
}))
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map