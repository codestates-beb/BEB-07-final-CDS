import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Swaps } from "./Swaps";

@Index("txHash", ["txHash"], { unique: true })
@Index("transactions_swapId_foreign_idx", ["swapId"], {})
@Entity("transactions", { schema: "cds_dev1" })
export class Transactions {
  @Column("varchar", { primary: true, name: "txHash", length: 100 })
  txHash: string;

  @Column("int", { name: "blockNum" })
  blockNum: number;

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

  @Column("int", { name: "swapId", nullable: true })
  swapId: number | null;

  @ManyToOne(() => Swaps, (swaps) => swaps.transactions, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "swapId", referencedColumnName: "swapId" }])
  swap: Swaps;
}
