import {
  Column,
  PrimaryColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Swaps } from './Swaps';

@Index('transactions_swapId_foreign_idx', ['swapId'], {})
@Index('txHash', ['txHash'], { unique: true })
@Entity('transactions', { schema: 'cds_dev3' })
export class Transactions {
  @PrimaryColumn('varchar', { primary: true, name: 'txHash', length: 100 })
  txHash: string;

  @Column('int', { name: 'blockNum' })
  blockNum: number;

  @Column('varchar', { name: 'event', length: 20, nullable: true })
  event: string | null;

  @Column('int', { name: 'createdAt', unsigned: true, nullable: false })
  createdAt: number;

  @Column('int', { name: 'updatedAt', unsigned: true, nullable: false })
  updatedAt: number;

  @Column('int', { name: 'deletedAt', unsigned: true, nullable: true })
  deletedAt: number | null;

  @Column('int', { name: 'swapId', nullable: true })
  swapId: number | null;

  @ManyToOne(() => Swaps, (swaps) => swaps.transactions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'swapId', referencedColumnName: 'swapId' }])
  swap: Swaps;
}
