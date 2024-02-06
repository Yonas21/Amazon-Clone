var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn, UpdateDateColumn, OneToMany, } from "typeorm";
import { Length, IsNotEmpty, IsString } from "class-validator";
import bcrypt from "bcryptjs";
import { BookEntity } from "./book.entity";
let UserEntity = class UserEntity {
    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    Column(),
    IsString(),
    Length(4, 20),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    Column(),
    IsString(),
    Length(4, 100),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    Column(),
    IsNotEmpty(),
    __metadata("design:type", String)
], UserEntity.prototype, "role", void 0);
__decorate([
    Column(),
    CreateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    Column(),
    UpdateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updatedAt", void 0);
__decorate([
    OneToMany(() => BookEntity, (books) => books.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "books", void 0);
UserEntity = __decorate([
    Entity("user"),
    Unique(["username"])
], UserEntity);
export { UserEntity };
//# sourceMappingURL=user.entity.js.map