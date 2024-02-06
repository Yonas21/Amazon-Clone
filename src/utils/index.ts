import "dotenv/config";
import { DataSourceOptions, DataSource } from "typeorm";
import { BookEntity, UserEntity } from "../entities";

const connectOptions: DataSourceOptions = {
	type: "postgres",
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_INSTANCE,
	synchronize: true,
	entities: [
		process.env.NODE_ENV === "prod"
			? "build/**/*.entity{,.js}"
			: "src/**/*.entity{.ts,.js}",
	],
	migrations: ["src/migration/*.ts"],
};

export const DB = new DataSource(connectOptions);

export const initDB = async () => {
	const db = await DB.initialize();

	return db;
};

export const initDBWithData = async () => {
	const db = await DB.initialize();

	await clearDB();

	await createAdmin();

	return db;
};

export const initDBWithAdmin = async () => {
	const db = await DB.initialize();

	await clearDB();

	await createAdmin();

	return db;
};

export const clearDB = async () => {
	const entities = DB.entityMetadatas;
	for (const entity of entities) {
		const repository = await DB.getRepository(entity.name);
		await repository.query(
			`TRUNCATE "${entity.tableName}" RESTART IDENTITY CASCADE;`
		);
	}
};

export const createAdmin = async () => {
	const user = new UserEntity();
	user.username = "admin";
	user.password = "admin";
	user.hashPassword();
	user.role = "ADMIN";

	await DB.getRepository(UserEntity).save(user);

	return user;
};

export const createBook = async (user: UserEntity, books: BookEntity) => {
	const book = new BookEntity();

	book.title = "48 Laws of Power" as any;
	book.writer = "Robert Green" as any;
	book.price = 5;
	book.coverImage =
		"https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg";
	book.tag = "essay";
	// book.user = user;

	await DB.getRepository(BookEntity).save(book);

	return book;
};

export const clearBooks = async () => {
	const bookingRepository = await DB.getRepository(BookEntity);
	await bookingRepository.query(
		`TRUNCATE "booking" RESTART IDENTITY CASCADE;`
	);
};

export const dropDB = async () => {
	await DB.destroy();
};

export const jwtSecret = process.env.JWT_SECRET as string;
