import { createClient, RedisClient } from 'redis';
import { Injectable, Scope } from '@nestjs/common';
const { REDIS_HOST, REDIS_PORT, REDIS_DB, REDIS_ON } = process.env;

@Injectable({
  scope: Scope.DEFAULT,
})
export class RedisConnection {
  redis: RedisClient;

  createInstance(config) {
    this.redis = createClient({
      host: config.host,
      port: config.port,
      db: config.db,
    });
    this.redis.on('error', (error) => {
      console.log(
        `AUTHENTICATION: Redis Connection Is Failed By http://127.0.0.1:6379:0 : ${error}`,
      );
    });

    this.redis.on('connect', () => {
      console.log(
        `AUTHENTICATION: Redis Connection Is SuccessFul By http://127.0.0.1:6379:0`,
      );
    });
    return this.redis;
  }
  getInstance(config) {
    if (REDIS_ON === 'true') {
      if (!this.redis) {
        this.redis = this.createInstance(config);
      }
      return this.redis;
    } else {
      return null;
    }
  }
}

export const redisConnection = {
  provide: 'REDIS_CONNECTION',
  scope: Scope.DEFAULT,
  useFactory: () =>
    new RedisConnection().getInstance({
      host: REDIS_HOST,
      port: REDIS_PORT,
      db: REDIS_DB,
    }),
};
