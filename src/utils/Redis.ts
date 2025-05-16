import { RedisOptions } from 'bullmq';

export const redisConnection: RedisOptions = {
  host: '127.0.0.1',  // Or use process.env.REDIS_HOST
  port: 6379,         // Or use process.env.REDIS_PORT
};
