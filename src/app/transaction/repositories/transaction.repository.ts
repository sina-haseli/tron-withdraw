import { EntityRepository } from 'typeorm';
import { BusinessRepository } from '../../base/business.repository';
import { Transaction } from '../entities/transaction.entity';

@EntityRepository(Transaction)
export class TransactionRepository extends BusinessRepository<Transaction> {
  async unConfirmedTransactions() {
    return this.createQueryBuilder('transaction')
      .leftJoin('transaction.tron', 'tron')
      .addSelect(['tron.userId', 'tron.id'])
      .andWhere('transaction.isConfirmed IS FALSE')
      .getMany();
  }

  async findByTransactionId(transactionid: string) {
    return this.createQueryBuilder('transaction')
      .andWhere('transaction.transactionId = :transactionId', {
        transactionId: transactionid,
      })
      .getOne();
  }
}
