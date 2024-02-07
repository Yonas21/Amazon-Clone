// bookRoutes.ts

import express from 'express';
import { AuthController } from '../controllers/auth';

const router = express.Router();
const authController = new AuthController();


// Define routes for creating, updating, and deleting users
router.post("/login", authController.login);
router.post("/change-password", authController.changePassword);


export default router;
