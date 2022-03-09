import { EntityRepository } from 'typeorm';
import { BusinessRepository } from '../../base/business.repository';
import { FreezeBalance } from '../entities/freeze-balance.entity';

@EntityRepository(FreezeBalance)
export class FreezeBalanceRepository extends BusinessRepository<FreezeBalance> {}
