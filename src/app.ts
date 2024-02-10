import express, { Application } from "express";
import "reflect-metadata";
import cors from "cors";
import helmet from "helmet";

import { initDBWithData } from "./utils";
import userRoutes from "./routers/users";
import bookRoutes from "./routers/books";
import authRoutes from "./routers/auth";
import orderRoutes from "./routers/order";

const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);

class Server {
	public express: Application;

	constructor() {
		this.express = express();
		this.configuration();
		this.routes();
		if (process.env.NODE_ENV !== "test") {
			this.start();
		}
	}

	public configuration() {
		this.express.use(cors());
		this.express.use(helmet());
		this.express.use(express.json());
	}

	public async routes() {
		if (process.env.NODE_ENV !== "test") {
			initDBWithData().then(() => {
				this.express.use(`/api/users/`, userRoutes);
				this.express.use(`/api/books/`, bookRoutes);
				this.express.use(`/api/auth/`, authRoutes);
				this.express.use(`/api/order/`, orderRoutes);
			});
		} else {
			this.express.use(`/api/users/`, userRoutes);
			this.express.use(`/api/books/`, bookRoutes);
			this.express.use(`/api/auth/`, authRoutes);
			this.express.use(`/api/order/`, orderRoutes);
		}
	}

	public start() {
		this.express.listen(port, () => {
			console.log(`server started at http://localhost:${port}`);
		});
	}
}

export default new Server().express;
