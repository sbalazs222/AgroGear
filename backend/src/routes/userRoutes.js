import express from "express";

import { authenticateToken } from "../middlewares/auth.js";
import { getUserData, getOrders, getFavourites, setFavourite  } from "../controllers/userController.js";

const router = express.Router();

router.get("/data", authenticateToken, getUserData);
router.get("/orders", authenticateToken, getOrders);
router.get("/favourites", authenticateToken, getFavourites);
router.post("/favourites", authenticateToken, setFavourite);

export default router;