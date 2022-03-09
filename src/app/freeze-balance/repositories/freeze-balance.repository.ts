import { EntityRepository } from 'typeorm';
import { BusinessRepository } from '../../base/business.repository';
import { FreezeBalance } from '../entities/freeze-balance.entity';

@EntityRepository(FreezeBalance)
export class FreezeBalanceRepository extends BusinessRepository<FreezeBalance> {
  async getFreezeBalancelast3Days() {
    await this.createQueryBuilder('freezeBalance')
      .andWhere('freezeBalance.createdAt > :date', {
        date: new Date(new Date().setDate(new Date().getDate() - 3)),
      })
      .getMany();
  }
}
