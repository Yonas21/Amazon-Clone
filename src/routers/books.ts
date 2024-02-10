// bookRoutes.ts

import express from "express";
import { BooksController } from "../controllers/books";
import { checkAuth, checkRole } from "../middleware";

const router = express.Router();
const bookController = new BooksController();

// Define routes for creating, updating, and deleting users
router.get("/", bookController.index);
router.get("/:id", bookController.getOne);
router.post(
	"/",
	[checkAuth, checkRole(["ADMIN", "USER"])],
	bookController.create
);
router.put(
	"/:id",
	[checkAuth, checkRole(["ADMIN", "USER"])],
	bookController.update
);
router.delete(
	"/:id",
	[checkAuth, checkRole(["ADMIN", "USER"])],
	bookController.delete
);

export default router;
