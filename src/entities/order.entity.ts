import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	Relation,
	CreateDateColumn,
	OneToMany,
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

@Entity("orders")
export class OrderEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToOne(() => BookEntity, (book) => book.orders)
	books!: Relation<BookEntity>;

	@ManyToOne(() => UserEntity, (user) => user)
	user!: Relation<UserEntity>;
}
