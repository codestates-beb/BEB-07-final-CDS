"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const typeorm_1 = require("typeorm");
const Swaps_1 = require("./Swaps");
let Transactions = class Transactions {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', { primary: true, name: 'txHash', length: 100 }),
    __metadata("design:type", String)
], Transactions.prototype, "txHash", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'blockNum' }),
    __metadata("design:type", Number)
], Transactions.prototype, "blockNum", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'event', length: 20, nullable: true }),
    __metadata("design:type", String)
], Transactions.prototype, "event", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'createdAt', unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], Transactions.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'updatedAt', unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], Transactions.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'deletedAt', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Transactions.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'swapId', nullable: true }),
    __metadata("design:type", Number)
], Transactions.prototype, "swapId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Swaps_1.Swaps, (swaps) => swaps.transactions, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'swapId', referencedColumnName: 'swapId' }]),
    __metadata("design:type", Swaps_1.Swaps)
], Transactions.prototype, "swap", void 0);
Transactions = __decorate([
    (0, typeorm_1.Index)('transactions_swapId_foreign_idx', ['swapId'], {}),
    (0, typeorm_1.Index)('txHash', ['txHash'], { unique: true }),
    (0, typeorm_1.Entity)('transactions', { schema: 'cds_dev3' })
], Transactions);
exports.Transactions = Transactions;
//# sourceMappingURL=Transactions.js.map