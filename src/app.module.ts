import { Module } from '@nestjs/common';
import { TronModule } from './app/tron/tron.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm.config';
import { RedisModule } from './redis/redis.module';
import { TransactionModule } from './app/transaction/transaction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      serveRoot: '/docs',
    }),
    TypeOrmModule.forRoot(TypeOrmConfig),
    ScheduleModule.forRoot(),
    RedisModule,
    TronModule,
    TransactionModule,
  ],
})
export class AppModule {}
