import { Module } from '@nestjs/common';
import { TronService } from './services/tron.service';
import { TronController } from './controllers/tron.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TronRepository } from './repositories/tron.repository';
import { TransactionModule } from '../transaction/transaction.module';
import { Unique } from '../common/decorator/validator/unique';
import { FreezeBalanceModule } from '../freeze-balance/freeze-balance.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TronRepository]),
    TransactionModule,
    FreezeBalanceModule,
  ],
  controllers: [TronController],
  providers: [TronService, Unique],
  exports: [TronService],
})
export class TronModule {}
