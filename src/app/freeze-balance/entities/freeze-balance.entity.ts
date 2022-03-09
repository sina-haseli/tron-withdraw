import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BusinessEntity } from '../../base/business.entity';

@Entity()
export class FreezeBalance extends BusinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  resource: string;

  @Column({ nullable: true })
  frozen_duration: number;

  @Column({ nullable: true })
  frozen_balance: number;

  @Column({ nullable: true })
  receiver_address: string;

  @Column({ nullable: true })
  owner_address: string;

  @Column({ nullable: true })
  txID: string;
}
