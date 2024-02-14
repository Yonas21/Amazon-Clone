// userRoutes.ts

import express from "express";
import { UserController } from "../controllers/users";

const router = express.Router();
const userController = new UserController();

// Define routes for creating, updating, and deleting users
router.get("/", userController.index);
router.get("/:id", userController.getOne);
router.post("/create", userController.create);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

export default router;
