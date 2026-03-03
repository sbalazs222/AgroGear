import express from "express";

import { authenticateToken } from "../middlewares/auth.js";
import { getUserData } from "../controllers/userController.js";
import { getOrders, setFavourite, getFavourites } from "../controllers/productController.js";

const router = express.Router();

router.get("/data", authenticateToken, getUserData);
router.get("/orders", authenticateToken, getOrders);
router.get("/favourites", authenticateToken, getFavourites);
router.post("/favourites", authenticateToken, setFavourite);

export default router;