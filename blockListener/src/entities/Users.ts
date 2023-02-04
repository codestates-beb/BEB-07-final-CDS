import { Column, PrimaryColumn, Entity, Index, OneToMany } from 'typeorm';
import { Swaps } from './Swaps';

@Index('address', ['address'], { unique: true })
@Entity('users', { schema: 'cds_dev3' })
export class Users {
  @PrimaryColumn('varchar', {
    primary: true,
    name: 'address',
    length: 100,
  })
  address: string;

  @Column('varchar', {
    name: 'nickname',
    nullable: true,
    length: 50,
    default: null,
  })
  nickname: string | null;

  @Column('int', { name: 'soldCount', unsigned: true, default: () => "'0'" })
  soldCount: number;

  @Column('int', { name: 'boughtCount', unsigned: true, default: () => "'0'" })
  boughtCount: number;

  @Column('int', { name: 'lastSold', unsigned: true, nullable: true })
  lastSold: number | null;

  @Column('int', { name: 'lastBought', unsigned: true, nullable: true })
  lastBought: number | null;

  @Column('int', { name: 'createdAt', unsigned: true, nullable: false })
  createdAt: number;

  @Column('int', { name: 'updatedAt', unsigned: true, nullable: false })
  updatedAt: number;

  @Column('int', { name: 'deletedAt', unsigned: true, nullable: true })
  deletedAt: number | null;

  @OneToMany(() => Swaps, (swaps) => swaps.buyer2)
  swaps: Swaps[];

  @OneToMany(() => Swaps, (swaps) => swaps.seller2)
  swaps2: Swaps[];
}
