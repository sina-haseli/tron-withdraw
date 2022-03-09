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
  amount: number;

  @ManyToOne(() => Tron, (tron) => tron.transactions, {
    eager: false,
  })
  tron: Tron;

  @Column({ nullable: true })
  from_address: string;

  @Column({ nullable: true })
  to_address: string;
}
