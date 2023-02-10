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
exports.Swaps = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Transactions_1 = require("./Transactions");
let Swaps = class Swaps {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('int', { primary: true, name: 'swapId' }),
    __metadata("design:type", Number)
], Swaps.prototype, "swapId", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'contractAddress',
        length: 100,
    }),
    __metadata("design:type", String)
], Swaps.prototype, "contractAddress", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'initialAssetPrice', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "initialAssetPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'amountOfAssets', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "amountOfAssets", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'totalAssets', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "totalAssets", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'premium', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "premium", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'premiumRate', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "premiumRate", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', {
        precision: 10,
        scale: 4,
        name: 'dropRate',
        unsigned: true,
    }),
    __metadata("design:type", Number)
], Swaps.prototype, "dropRate", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'premiumInterval', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "premiumInterval", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'remainPremiumRounds', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "remainPremiumRounds", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'totalPremiumRounds', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "totalPremiumRounds", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'sellerDeposit', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "sellerDeposit", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'buyerDeposit', nullable: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "buyerDeposit", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'claimPrice', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "claimPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint', { name: 'liquidationPrice', unsigned: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "liquidationPrice", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'status',
        nullable: true,
        length: 20,
        default: 'pending',
    }),
    __metadata("design:type", String)
], Swaps.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'updatableStatus', nullable: true, length: 20 }),
    __metadata("design:type", String)
], Swaps.prototype, "updatableStatus", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'createdAt', unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], Swaps.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'updatedAt', unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], Swaps.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'lastPaidAt', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "lastPaidAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'terminatedAt', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "terminatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'deletedAt', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Swaps.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'seller', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Swaps.prototype, "seller", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { name: 'buyer', nullable: true, length: 100 }),
    __metadata("design:type", String)
], Swaps.prototype, "buyer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.swaps, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'buyer', referencedColumnName: 'address' }]),
    __metadata("design:type", Users_1.Users)
], Swaps.prototype, "buyer2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.swaps2, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)([{ name: 'seller', referencedColumnName: 'address' }]),
    __metadata("design:type", Users_1.Users)
], Swaps.prototype, "seller2", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Transactions_1.Transactions, (transactions) => transactions.swap),
    __metadata("design:type", Array)
], Swaps.prototype, "transactions", void 0);
Swaps = __decorate([
    (0, typeorm_1.Index)('swapId', ['swapId'], { unique: true }),
    (0, typeorm_1.Index)('swaps_buyer_foreign_idx', ['buyer'], {}),
    (0, typeorm_1.Index)('swaps_seller_foreign_idx', ['seller'], {}),
    (0, typeorm_1.Entity)('swaps', { schema: 'cds_dev3' })
], Swaps);
exports.Swaps = Swaps;
//# sourceMappingURL=Swaps.js.map