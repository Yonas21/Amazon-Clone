// bookRoutes.ts

import express from 'express';
import { BooksController } from '../controllers/books';

const router = express.Router();
const bookController = new BooksController();


// Define routes for creating, updating, and deleting users
router.get("/", bookController.index);
router.get("/:id", bookController.getOne);
router.post("/", bookController.create);
router.put("/:id", bookController.update);
router.delete("/:id", bookController.delete);


export default router;
