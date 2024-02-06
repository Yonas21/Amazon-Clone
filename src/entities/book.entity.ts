import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	Relation,
	CreateDateColumn,
} from "typeorm";
import { IsNumber, IsNotEmpty, IsDateString } from "class-validator";
import { UserEntity } from "./user.entity";

@Entity("books")
export class BookEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	@IsDateString()
	startDate!: Date;

	@Column()
	@IsDateString()
	endDate!: Date;

	@Column()
	@IsNotEmpty()
	@IsNumber()
	cost!: number;

	@Column()
	@CreateDateColumn()
	createdAt!: Date;

	@ManyToOne(() => UserEntity, (user) => user.books)
	user!: Relation<UserEntity>;
}
