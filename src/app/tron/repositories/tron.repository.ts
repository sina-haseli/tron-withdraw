import { EntityRepository } from 'typeorm';
import { BusinessRepository } from '../../base/business.repository';
import { Tron } from '../entities/tron.entity';

@EntityRepository(Tron)
export class TronRepository extends BusinessRepository<Tron> {
  async getTronByUserId(userId: number) {
    return this.createQueryBuilder('tron')
      .leftJoinAndSelect('tron.transactions', 'trans')
      .andWhere('tron.userId = :userId', { userId })
      .getMany();
  }

  async getTronByWalletAddress(walletAddress: string) {
    return this.createQueryBuilder('tron')
      .leftJoinAndSelect('tron.transactions', 'trans')
      .andWhere('tron.walletId = :walletAddress', { walletAddress })
      .getOne();
  }

  async findOneByWallet(walletAddress: string) {
    return this.createQueryBuilder('tron')
      .andWhere('tron.walletId =:walletAddress', { walletAddress })
      .getOne();
  }

  async getWallet(amount: number) {
    return this.createQueryBuilder('tron')
      .select(['tron.id', 'tron.total_amount', 'tron.userId'])
      .andWhere('tron.total_amount > :amount', { amount })
      .orderBy('tron.total_amount', 'ASC')
      .getMany();
  }
}
