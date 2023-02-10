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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Swaps_1 = require("./Swaps");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)('varchar', {
        primary: true,
        name: 'address',
        length: 100,
    }),
    __metadata("design:type", String)
], Users.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'email',
        nullable: true,
        length: 100,
        default: null,
    }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', {
        name: 'nickname',
        nullable: true,
        length: 50,
        default: null,
    }),
    __metadata("design:type", String)
], Users.prototype, "nickname", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'soldCount', unsigned: true, default: () => "'0'" }),
    __metadata("design:type", Number)
], Users.prototype, "soldCount", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'boughtCount', unsigned: true, default: () => "'0'" }),
    __metadata("design:type", Number)
], Users.prototype, "boughtCount", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'lastSold', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "lastSold", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'lastBought', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "lastBought", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'nonce', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "nonce", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'createdAt', unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], Users.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'updatedAt', unsigned: true, nullable: false }),
    __metadata("design:type", Number)
], Users.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'deletedAt', unsigned: true, nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Swaps_1.Swaps, (swaps) => swaps.buyer2),
    __metadata("design:type", Array)
], Users.prototype, "swaps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Swaps_1.Swaps, (swaps) => swaps.seller2),
    __metadata("design:type", Array)
], Users.prototype, "swaps2", void 0);
Users = __decorate([
    (0, typeorm_1.Index)('address', ['address'], { unique: true }),
    (0, typeorm_1.Entity)('users', { schema: 'cds_dev3' })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map