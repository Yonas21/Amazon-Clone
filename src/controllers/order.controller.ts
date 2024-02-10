import { validate } from "class-validator";
import { Response, Request } from "express";
import { OrderEntity } from "../entities";
import {
	OrderRepository,
	UserRepository,
	BooksRepository,
} from "../repository";

export class OrderController {
	private booksRepository: typeof BooksRepository;
	private userRepository: typeof UserRepository;
	private orderRepository: typeof OrderRepository;

	constructor() {
		this.booksRepository = BooksRepository;
		this.userRepository = UserRepository;
		this.orderRepository = OrderRepository;
	}

	public index = async (req: Request, res: Response) => {
		try {
			const orders = await this.orderRepository.find({
				order: {
					id: "DESC",
				},
				relations: {
					user: true,
					books: true,
				},
			});
			return res.send(orders);
		} catch (error) {
			return res.status(500).send("Internal Server Error");
		}
	};

	public getOne = async (req: Request, res: Response) => {
		const id = req["params"]["id"];

		try {
			const order = await this.orderRepository.findOneOrFail({
				where: {
					id: Number(id),
				},
				relations: {
					user: true,
					books: true,
				},
			});
			return res.send(order);
		} catch (error) {
			return res.status(400).send("Not found");
		}
	};

	public create = async (req: Request, res: Response) => {
		const { book_id } = req.body;
		const orders = new OrderEntity();

		console.log(req.body);
		const user_id = res.locals.jwtPayload.userId;

		let user;
		let book;
		try {
			user = await this.userRepository.findOneOrFail({
				where: {
					id: Number(user_id),
				},
			});
		} catch (error) {
			res.status(400).send("Provide valid user for booking");
			return;
		}

		try {
			book = await this.booksRepository.findOneOrFail({
				where: {
					id: Number(book_id),
				},
			});
		} catch (error) {
			res.status(400).send("Provide valid user for booking");
			return;
		}

		orders.user = user;
		orders.books = book;

		const errors = await validate(book);
		if (errors.length > 0) {
			res.status(400).send(errors);
			return;
		}

		try {
			await this.booksRepository.save(book);
		} catch (e) {
			res.status(409).send("Order already Done");
			return;
		}

		res.status(201).send("You are Ordered Successfully");
	};

	public delete = async (req: Request, res: Response) => {
		const id = req.params.id;

		try {
			await this.orderRepository.findOneOrFail({
				where: {
					id: Number(id),
				},
			});
		} catch (error) {
			res.status(404).send("Order not found");
			return;
		}
		this.orderRepository.delete(id);

		res.status(204).send();
	};
}
