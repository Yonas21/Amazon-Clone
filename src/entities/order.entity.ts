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

@Entity("orders")
export class OrderEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	@IsNumber()
	points!: Number;

	@ManyToOne(() => BookEntity, (book) => book)
	books!: Relation<BookEntity>;

	@ManyToOne(() => UserEntity, (user) => user.orders)
	user!: Relation<UserEntity>;
}
