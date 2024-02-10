// bookRoutes.ts

import express from "express";
import { OrderController } from "../controllers/order.controller";
import { checkAuth, checkRole } from "../middleware";

const router = express.Router();
const ordersController = new OrderController();

// Define routes for creating, updating, and deleting users
router.get(
	"/",
	[checkAuth, checkRole(["ADMIN", "USER"])],
	ordersController.index
);
router.get(
	"/:id",
	[checkAuth, checkRole(["ADMIN", "USER"])],
	ordersController.getOne
);
router.post(
	"/",
	[checkAuth, checkRole(["ADMIN", "USER"])],
	ordersController.create
);
router.delete(
	"/:id",
	[checkAuth, checkRole(["ADMIN", "USER"])],
	ordersController.delete
);

export default router;
