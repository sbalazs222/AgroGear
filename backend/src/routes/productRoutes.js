import express from "express";
import { getProductsByCategory } from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/category/:category", authenticateToken, getProductsByCategory);

export default router;