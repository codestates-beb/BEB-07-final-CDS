"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
let redisClient;
if (REDIS_HOST.includes('redis-17409')) {
    redisClient = new ioredis_1.default(+REDIS_PORT, REDIS_HOST, {
        password: REDIS_PASSWORD,
    });
}
else {
    redisClient = new ioredis_1.default(+REDIS_PORT, REDIS_HOST);
}
exports.default = redisClient;
//# sourceMappingURL=redisClient.js.map