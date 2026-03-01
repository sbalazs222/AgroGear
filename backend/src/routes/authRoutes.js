import express from "express";
import { validateFieldCount, validateRequiredFields } from "psgutil";
import { register, login, logout } from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", validateFieldCount(3), validateRequiredFields(['username', 'email', 'password']), register);
router.post("/login", validateFieldCount(2), validateRequiredFields(['email', 'password']), login);
router.post("/logout", authenticateToken, logout);

export default router;