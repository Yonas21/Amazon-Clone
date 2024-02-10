import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	Relation,
	CreateDateColumn,
} from "typeorm";
import { IsNumber, IsNotEmpty, IsDateString, IsString } from "class-validator";
import { UserEntity } from "./user.entity";
import { OrderEntity } from "./order.entity";

enum Tag {
	FICTION = "fiction",
	NON_FICTION = "non-fiction",
	SCIENCE = "science",
	ESSAY = "essay",
}

@Entity("books")
export class BookEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	@IsString()
	title!: String;

	@Column()
	@IsString()
	writer!: String;

	@Column()
	@IsString()
	coverImage!: String;

	@Column()
	@IsNumber()
	price!: Number;

	@Column()
	@IsString()
	tag!: string;

	@ManyToOne(() => UserEntity, (user) => user.books)
	user!: Relation<UserEntity>;

	@ManyToOne(() => OrderEntity, (order) => order.books)
	orders!: Relation<OrderEntity>;
}
