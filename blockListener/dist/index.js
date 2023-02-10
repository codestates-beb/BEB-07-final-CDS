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
const CDS_json_1 = require("./contractArtifacts/CDS.json");
const CDS_1 = __importDefault(require("./CDS"));
const getEnv_1 = __importDefault(require("./utils/getEnv"));
const clearRecords_1 = __importDefault(require("./utils/clearRecords"));
const REMOTE_WEBSOCKET = (0, getEnv_1.default)('REMOTE_WEBSOCKET');
const GETH_WEBSOCKET = (0, getEnv_1.default)('GETH_WEBSOCKET');
const NETWORK = (0, getEnv_1.default)('NETWORK');
const DB_SCHEMA = (0, getEnv_1.default)('DB_SCHEMA');
const CDS_CA = (0, getEnv_1.default)('CDS_CA');
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    const rpcEndpoint = NETWORK === 'geth' ? GETH_WEBSOCKET : REMOTE_WEBSOCKET;
    console.log('** META INFORMATION **');
    console.log(`WEB3 NETWORK : ${NETWORK}`);
    console.log(`RPC ENDPOINT : ${rpcEndpoint}`);
    console.log(`CDS_CA : ${CDS_CA}`);
    console.log(`DB SCHEMA: ${DB_SCHEMA}`);
    yield (0, clearRecords_1.default)(data_source_1.AppDataSource);
    let cds = CDS_1.default.getInstance(rpcEndpoint, data_source_1.AppDataSource.manager);
    cds.setContract(CDS_json_1.abi, CDS_CA);
    cds.setFromBlock((0, getEnv_1.default)('CDS_TXHASH', '0'));
    yield cds.getPastEvents();
    cds.subEvents();
}))
    .catch((error) => console.log(error));
//# sourceMappingURL=index.js.map