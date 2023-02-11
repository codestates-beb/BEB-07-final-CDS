"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const path = require("path");
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Users_1 = require("./entities/Users");
const Transactions_1 = require("./entities/Transactions");
const Swaps_1 = require("./entities/Swaps");
const _1675407005234_SequelizeToTypeOrm_1 = require("./migrations/1675407005234-SequelizeToTypeOrm");
const getEnv_1 = __importDefault(require("./utils/getEnv"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: (0, getEnv_1.default)('DB_HOST'),
    port: 3306,
    username: (0, getEnv_1.default)('DB_USERNAME'),
    password: (0, getEnv_1.default)('DB_PASSWORD'),
    database: (0, getEnv_1.default)('DB_SCHEMA'),
    synchronize: true,
    logging: false,
    entities: [Users_1.Users, Transactions_1.Transactions, Swaps_1.Swaps],
    migrations: [_1675407005234_SequelizeToTypeOrm_1.SequelizeToTypeOrm1675407005234],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map