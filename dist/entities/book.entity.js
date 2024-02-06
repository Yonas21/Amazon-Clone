var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, } from "typeorm";
import { IsNumber, IsNotEmpty, IsDateString } from "class-validator";
import { UserEntity } from "./user.entity";
let BookEntity = class BookEntity {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], BookEntity.prototype, "id", void 0);
__decorate([
    Column(),
    IsDateString(),
    __metadata("design:type", Date)
], BookEntity.prototype, "startDate", void 0);
__decorate([
    Column(),
    IsDateString(),
    __metadata("design:type", Date)
], BookEntity.prototype, "endDate", void 0);
__decorate([
    Column(),
    IsNotEmpty(),
    IsNumber(),
    __metadata("design:type", Number)
], BookEntity.prototype, "cost", void 0);
__decorate([
    Column(),
    CreateDateColumn(),
    __metadata("design:type", Date)
], BookEntity.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => UserEntity, (user) => user.books),
    __metadata("design:type", UserEntity)
], BookEntity.prototype, "user", void 0);
BookEntity = __decorate([
    Entity("books")
], BookEntity);
export { BookEntity };
//# sourceMappingURL=book.entity.js.map