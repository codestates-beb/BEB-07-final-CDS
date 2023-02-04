import {
  Column,
  PrimaryColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Users } from './Users';
import { Transactions } from './Transactions';

@Index('swapId', ['swapId'], { unique: true })
@Index('swaps_buyer_foreign_idx', ['buyer'], {})
@Index('swaps_seller_foreign_idx', ['seller'], {})
@Entity('swaps', { schema: 'cds_dev3' })
export class Swaps {
  @PrimaryColumn('int', { primary: true, name: 'swapId' })
  swapId: number;

  @Column('varchar', {
    name: 'contractAddress',
    length: 100,
  })
  contractAddress: string;

  @Column('int', { name: 'initialAssetPrice', unsigned: true })
  initialAssetPrice: number;

  @Column('int', { name: 'amountOfAssets', unsigned: true })
  amountOfAssets: number;

  @Column('int', { name: 'totalAssets', unsigned: true })
  totalAssets: number;

  @Column('int', { name: 'premium', unsigned: true })
  premium: number;

  @Column('int', { name: 'premiumRate', unsigned: true })
  premiumRate: number;

  @Column('decimal', {
    precision: 10,
    scale: 4,
    name: 'dropRate',
    unsigned: true,
  })
  dropRate: number;

  @Column('int', { name: 'premiumInterval', unsigned: true })
  premiumInterval: number;

  @Column('int', { name: 'totalPremiumRounds', unsigned: true })
  totalPremiumRounds: number;

  @Column('bigint', { name: 'sellerDeposit', unsigned: true, nullable: true })
  sellerDeposit: number | null;

  @Column('bigint', { name: 'buyerDeposit', nullable: true })
  buyerDeposit: number | null;

  @Column('bigint', { name: 'claimPrice', unsigned: true })
  claimPrice: number;

  @Column('bigint', { name: 'liquidationPrice', unsigned: true })
  liquidationPrice: number;

  @Column('varchar', {
    name: 'status',
    nullable: true,
    length: 20,
    default: 'pending',
  })
  status: string | null;

  @Column('varchar', { name: 'updatableStatus', nullable: true, length: 20 })
  updatableStatus: string | null;

  @Column('int', { name: 'createdAt', unsigned: true, nullable: false })
  createdAt: number;

  @Column('int', { name: 'updatedAt', unsigned: true, nullable: false })
  updatedAt: number;

  @Column('int', { name: 'terminatedAt', unsigned: true, nullable: true })
  terminatedAt: number | null;

  @Column('int', { name: 'deletedAt', unsigned: true, nullable: true })
  deletedAt: number | null;

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
