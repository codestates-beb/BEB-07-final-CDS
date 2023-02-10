import Redis from 'ioredis';

const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const redisClient = new Redis(+REDIS_PORT, REDIS_HOST, {
  // password: REDIS_PASSWORD,
});
// const redisClient = new Redis.Cluster([
//   { port: 17409, host: 'cds-redis-ro.krqv5r.ng.0001.apn2.cache.amazonaws.com' },
//   {
//     port: 17409,
//     host: 'cds-redis.krqv5r.ng.0001.apn2.cache.amazonaws.com:17409',
//   },
// ]);
console.log(REDIS_HOST, REDIS_PORT, REDIS_PASSWORD);
console.log(redisClient);

export default redisClient;
