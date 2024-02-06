import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";

import { Length, IsNotEmpty, IsString } from "class-validator";
import bcrypt from "bcryptjs";
import { BookEntity } from "./book.entity";

@Entity("user")
@Unique(["username"])
export class UserEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	@IsString()
	@Length(4, 20)
	username!: string;

	@Column()
	@IsString()
	@Length(4, 100)
	password!: string;

	@Column()
	@IsNotEmpty()
	role!: string;

	@Column()
	@CreateDateColumn()
	createdAt!: Date;

	@Column()
	@UpdateDateColumn()
	updatedAt!: Date;

	@OneToMany(() => BookEntity, (books) => books.user)
	books!: BookEntity[];

	hashPassword() {
		this.password = bcrypt.hashSync(this.password, 8);
	}

	checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
		return bcrypt.compareSync(unencryptedPassword, this.password);
	}
}
