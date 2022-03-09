import { Inject, Injectable } from '@nestjs/common';
import { RedisClient } from '@nestjs/microservices/external/redis.interface';
import { promisify } from 'util';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CONNECTION') private clientService: RedisClient) {}

  async set(key: string, value: string) {
    return promisify(this.clientService.set).call(
      this.clientService,
      key,
      value,
    );
  }

  async get(key: string) {
    return promisify(this.clientService.get).call(this.clientService, key);
  }

  async exists(key: string) {
    return promisify(this.clientService.exists).call(this.clientService, key);
  }

  async keys(pattern: string) {
    return promisify(this.clientService.keys).call(this.clientService, pattern);
  }

  async del(key: string) {
    return promisify(this.clientService.del).call(this.clientService, key);
  }

  async flushdb() {
    return promisify(this.clientService.flushdb).call(this.clientService);
  }

  async flushall() {
    return promisify(this.clientService.flushall).call(this.clientService);
  }

  async hmset(key: string, ...args: any[]) {
    return promisify(this.clientService.hmset).call(
      this.clientService,
      key,
      ...args,
    );
  }

  async hmget(key: string, ...args: any[]) {
    return promisify(this.clientService.hmget).call(
      this.clientService,
      key,
      ...args,
    );
  }

  async expire(key: string, seconds: number) {
    return promisify(this.clientService.expire).call(
      this.clientService,
      key,
      seconds,
    );
  }
}
