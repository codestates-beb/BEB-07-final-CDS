import Redis from 'ioredis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisClient = new Redis(+REDIS_PORT, REDIS_HOST, {
  password: REDIS_PASSWORD,
});

export default redisClient;
