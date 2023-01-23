import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from './Users';
import { Transactions } from './Transactions';

@Index('swapId', ['swapId'], { unique: true })
@Index('swaps_seller_foreign_idx', ['seller'], {})
@Index('swaps_buyer_foreign_idx', ['buyer'], {})
@Entity('swaps', { schema: 'cds_dev1' })
export class Swaps {
  @Column('int', { primary: true, name: 'swapId' })
  swapId: number;

  @Column('int', { name: 'initialAssetPrice' })
  initialAssetPrice: number;

  @Column('int', { name: 'premium' })
  premium: number;

  @Column('int', { name: 'sellerDeposit', nullable: true })
  sellerDeposit: number | null;

  @Column('int', { name: 'buyerDeposit', nullable: true })
  buyerDeposit: number | null;

  @Column('int', { name: 'claimPrice' })
  claimPrice: number;

  @Column('int', { name: 'liquidationPrice' })
  liquidationPrice: number;

  @Column('enum', {
    name: 'status',
    enum: ['pending', 'active', 'expired', 'overdue', 'liquidated'],
  })
  status: 'pending' | 'active' | 'expired' | 'overdue' | 'liquidated';

  @Column('enum', {
    name: 'updatableStatus',
    enum: ['pending', 'active', 'expired', 'overdue', 'liquidated'],
  })
  updatableStatus: 'pending' | 'active' | 'expired' | 'overdue' | 'liquidated';

  @Column('datetime', {
    name: 'createdAt',
    default: () => "'2023-01-19 03:04:17'",
  })
  createdAt: Date;

  @Column('datetime', {
    name: 'updatedAt',
    default: () => "'2023-01-19 03:04:17'",
  })
  updatedAt: Date;

  @Column('datetime', { name: 'deletedAt', nullable: true })
  deletedAt: Date | null;

  @Column('varchar', { name: 'seller', nullable: true, length: 100 })
  seller: string | null;

  @Column('varchar', { name: 'buyer', nullable: true, length: 100 })
  buyer: string | null;

  @ManyToOne(() => Users, (users) => users.swaps, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'buyer', referencedColumnName: 'address' }])
  buyer2: Users;

  @ManyToOne(() => Users, (users) => users.swaps2, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'seller', referencedColumnName: 'address' }])
  seller2: Users;

  @OneToMany(() => Transactions, (transactions) => transactions.swap)
  transactions: Transactions[];
}
