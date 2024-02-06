import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	OneToMany,
	Relation,
} from "typeorm";
import { IsNumber, IsNotEmpty, IsDateString, IsString } from "class-validator";
import { BookEntity } from "./book.entity";
import { UserEntity } from "./user.entity";

enum Tag {
	FICTION = "fiction",
	NON_FICTION = "non-fiction",
	SCIENCE = "science",
	ESSAY = "essay",
}

@Entity("buys")
export class BuyEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@OneToMany(() => BookEntity, (book) => book)
	book!: Relation<BookEntity>;

	@OneToMany(() => UserEntity, (user) => user)
	user!: Relation<UserEntity>;
}
