import { validate } from "class-validator";
import { Router, Response, Request } from "express";
import { BookEntity } from "../entities";
import { BooksRepository, UserRepository } from "../repository";

export class BooksController {
	private booksRepository: typeof BooksRepository;
	private userRepository: typeof UserRepository;

	constructor() {
		this.booksRepository = BooksRepository;
		this.userRepository = UserRepository;
	}

	public index = async (req: Request, res: Response) => {
		try {
			const bookings = await this.booksRepository.find({
				order: {
					id: "DESC",
				},
				relations: {
					user: true,
				},
			});
			return res.send(bookings);
		} catch (error) {
			return res.status(500).send("Internal Server Error");
		}
	};

	public getOne = async (req: Request, res: Response) => {
		const id = req["params"]["id"];

		try {
			const destination = await this.booksRepository.findOneOrFail({
				where: {
					id: Number(id),
				},
				relations: {
					user: true,
				},
			});
			return res.send(destination);
		} catch (error) {
			return res.status(400).send("Not found");
		}
	};

	public create = async (req: Request, res: Response) => {
		const { title, writer, coverImage, price, tag } = req.body;
		const books = new BookEntity();

		console.log(req.body);
		// const userId = res.locals.jwtPayload.userId;

		// let user;
		// try {
		// 	user = await this.userRepository.findOneOrFail({
		// 		where: {
		// 			id: Number(userId),
		// 		},
		// 	});
		// } catch (error) {
		// 	res.status(400).send("Provide valid user for booking");
		// 	return;
		// }

		books.title = title;
		books.writer = writer;
		books.coverImage = coverImage;
		books.price = price;
		books.tag = tag;

		// books.user = user;

		const errors = await validate(books);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		try {
			await this.booksRepository.save(books);
		} catch (e) {
			res.status(409).send("Book already exist");
			return;
		}

		res.status(201).send("Book created");
	};

	public update = async (req: Request, res: Response) => {
		const id = req.params.id;
		const { title, writer, coverImage, price, tag } = req.body;

		let book;

		try {
			book = await this.booksRepository.findOneOrFail({
				where: {
					id: Number(id),
				},
			});
		} catch (error) {
			res.status(404).send("Booking not found");
			return;
		}

		book.title = title;
		book.writer = writer;
		book.coverImage = coverImage;
		book.price = price;
		book.tag = tag;

		try {
			await this.booksRepository.save(book);
		} catch (e) {
			res.status(400).send("Could not update user");
			return;
		}

		res.status(204).send();
	};

	public delete = async (req: Request, res: Response) => {
		const id = req.params.id;

		try {
			await this.booksRepository.findOneOrFail({
				where: {
					id: Number(id),
				},
			});
		} catch (error) {
			res.status(404).send("Booking not found");
			return;
		}
		this.booksRepository.delete(id);

		res.status(204).send();
	};

}
