import express from "express";

import { authenticateToken } from "../middlewares/auth.js";
import { getUserData } from "../controllers/userController.js";
import { getOrders } from "../controllers/productController.js";

const router = express.Router();

router.get("/data", authenticateToken, getUserData);
router.get("/orders", authenticateToken, getOrders);

export default router;