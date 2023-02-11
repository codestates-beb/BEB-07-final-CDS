import Redis from 'ioredis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
let redisClient: Redis;

if (REDIS_HOST.includes('redis-17409')) {
  redisClient = new Redis(+REDIS_PORT, REDIS_HOST, {
    password: REDIS_PASSWORD,
  });
} else {
  redisClient = new Redis(+REDIS_PORT, REDIS_HOST);
}

export default redisClient;
