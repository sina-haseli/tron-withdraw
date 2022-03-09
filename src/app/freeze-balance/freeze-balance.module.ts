import { Module } from '@nestjs/common';
import { FreezeBalanceService } from './services/freeze-balance.service';
import { FreezeBalanceController } from './controllers/freeze-balance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FreezeBalanceRepository } from './repositories/freeze-balance.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FreezeBalanceRepository])],
  controllers: [FreezeBalanceController],
  providers: [FreezeBalanceService],
  exports: [FreezeBalanceService],
})
export class FreezeBalanceModule {}
