var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import "reflect-metadata";
import { initDBWithData } from "./utils";
import { AuthController, BooksController, UserController, } from "./controllers/index";
import cors from "cors";
import helmet from "helmet";
const port = process.env.PORT || 3000;
console.log(process.env.NODE_ENV);
class Server {
    constructor() {
        this.express = express();
        this.configuration();
        this.routes();
        if (process.env.NODE_ENV !== "test") {
            this.start();
        }
    }
    configuration() {
        this.express.use(cors());
        this.express.use(helmet());
        this.express.use(express.json());
    }
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            if (process.env.NODE_ENV !== "test") {
                initDBWithData().then(() => {
                    this.express.use(`/api/users/`, new UserController().router);
                    this.express.use(`/api/bookings/`, new BooksController().router);
                    this.express.use(`/api/auth/`, new AuthController().router);
                });
            }
            else {
                this.express.use(`/api/users/`, new UserController().router);
                this.express.use(`/api/bookings/`, new BooksController().router);
                this.express.use(`/api/destinations/`, new BooksController().router);
                this.express.use(`/api/auth/`, new AuthController().router);
            }
        });
    }
    start() {
        this.express.listen(port, () => {
            console.log(`server started at http://localhost:${port}`);
        });
    }
}
export default new Server().express;
//# sourceMappingURL=app.js.map