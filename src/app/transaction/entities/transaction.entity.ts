import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessEntity } from '../../base/business.entity';
import { Tron } from '../../tron/entities/tron.entity';

@Entity()
export class Transaction extends BusinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  transactionId: string;

  @Column({ nullable: true })
  blockNumber: number;

  @Column({ nullable: true })
  amount: string;

  @ManyToOne(() => Tron, (tron) => tron.transactions, {
    eager: false,
  })
  tron: Tron;

  @Column({ nullable: true })
  isConfirmed: boolean;
}
