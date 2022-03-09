import { Global, Module } from '@nestjs/common';
import { redisConnection } from '../config/redis.config';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [],
  providers: [RedisService, redisConnection],
  exports: [RedisService],
})
export class RedisModule {}
