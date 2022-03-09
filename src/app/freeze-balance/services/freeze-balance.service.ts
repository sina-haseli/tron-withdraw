import { Injectable } from '@nestjs/common';
import { FreezeBalanceRepository } from '../repositories/freeze-balance.repository';
import { BusinessService } from '../../base/business.service';
import { FreezeBalance } from '../entities/freeze-balance.entity';

@Injectable()
export class FreezeBalanceService extends BusinessService<FreezeBalance> {
  constructor(
    private readonly freezeBalanceRepository: FreezeBalanceRepository,
  ) {
    super(freezeBalanceRepository);
  }
}
