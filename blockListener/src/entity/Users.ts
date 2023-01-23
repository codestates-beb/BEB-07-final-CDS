import { Column, Entity, Index, OneToMany } from "typeorm";
import { Swaps } from "./Swaps";

@Index("address", ["address"], { unique: true })
@Entity("users", { schema: "cds_dev1" })
export class Users {
  @Column("varchar", { primary: true, name: "address", length: 100 })
  address: string;

  @Column("varchar", {
    name: "nickname",
    nullable: true,
    length: 50,
    default: () => "'unnamed'",
  })
  nickname: string | null;

  @Column("int", { name: "soldCount", default: () => "'0'" })
  soldCount: number;

  @Column("int", { name: "boughtCount", default: () => "'0'" })
  boughtCount: number;

  @Column("datetime", { name: "lastSold", nullable: true })
  lastSold: Date | null;

  @Column("datetime", { name: "lastBought", nullable: true })
  lastBought: Date | null;

  @Column("datetime", {
    name: "createdAt",
    default: () => "'2023-01-19 03:04:17'",
  })
  createdAt: Date;

  @Column("datetime", {
    name: "updatedAt",
    default: () => "'2023-01-19 03:04:17'",
  })
  updatedAt: Date;

  @Column("datetime", { name: "deletedAt", nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => Swaps, (swaps) => swaps.buyer2)
  swaps: Swaps[];

  @OneToMany(() => Swaps, (swaps) => swaps.seller2)
  swaps2: Swaps[];
}
