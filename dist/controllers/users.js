var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validate } from "class-validator";
import { Router } from "express";
import { UserEntity } from "../entities";
import { UserRepository } from "../repository";
export class UserController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.find({
                    select: {
                        id: true,
                        username: true,
                        role: true,
                        books: {
                            id: true,
                        },
                    },
                    relations: {
                        books: {
                            user: true,
                        },
                    },
                    order: {
                        books: {
                            id: "DESC",
                        },
                    },
                });
                return res.send(users);
            }
            catch (error) {
                return res.status(500).send("Internal Server Error");
            }
        });
        this.getOne = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req["params"]["id"];
            try {
                const user = yield this.userRepository.findOneOrFail({
                    where: {
                        id: Number(id),
                    },
                    select: {
                        id: true,
                        username: true,
                        role: true,
                        books: {
                            id: true,
                        },
                    },
                    relations: {
                        books: {
                            user: true,
                        },
                    },
                    order: {
                        books: {
                            id: "DESC",
                        },
                    },
                });
                return res.send(user);
            }
            catch (error) {
                return res.status(404).send("User not found");
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password, role } = req.body;
            const user = new UserEntity();
            user.username = username;
            user.password = password;
            user.role = role;
            const errors = yield validate(user);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            user.hashPassword();
            try {
                yield this.userRepository.save(user);
            }
            catch (e) {
                res.status(409).send("Username already in use");
                return;
            }
            res.status(201).send("User created");
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const { username, role } = req.body;
            let user;
            try {
                user = yield this.userRepository.findOneOrFail({
                    where: {
                        id: Number(id),
                    },
                });
            }
            catch (error) {
                res.status(404).send("User not found");
                return;
            }
            user.username = username;
            user.role = role;
            const errors = yield validate(user);
            if (errors.length > 0) {
                res.status(400).send(errors);
                return;
            }
            try {
                yield this.userRepository.save(user);
            }
            catch (e) {
                res.status(400).send("Could not update user");
                return;
            }
            res.status(204).send();
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                yield this.userRepository.findOneOrFail({
                    where: {
                        id: Number(id),
                    },
                });
            }
            catch (error) {
                res.status(404).send("User not found");
                return;
            }
            this.userRepository.delete(id);
            res.status(204).send();
        });
        this.userRepository = UserRepository;
        this.router = Router();
        this.routes();
    }
    routes() {
        this.router.get("/", this.index);
        this.router.get("/:id", this.getOne);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
//# sourceMappingURL=users.js.map