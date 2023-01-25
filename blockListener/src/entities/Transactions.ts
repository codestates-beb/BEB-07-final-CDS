import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Swaps } from './Swaps';

@Index('transactions_swapId_foreign_idx', ['swapId'], {})
@Index('txHash', ['txHash'], { unique: true })
@Entity('transactions', { schema: 'cds_dev2' })
export class Transactions {
  @Column('varchar', { primary: true, name: 'txHash', length: 100 })
  txHash: string;

  @Column('int', { name: 'blockNum' })
  blockNum: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @Column('int', { name: 'swapId', nullable: true })
  swapId: number | null;

  @ManyToOne(() => Swaps, (swaps) => swaps.transactions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'swapId', referencedColumnName: 'swapId' }])
  swap: Swaps;
}
