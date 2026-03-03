import express from "express";

import { authenticateToken } from "../middlewares/auth.js";
import { getUserData, getOrders, getFavourites, setFavourite  } from "../controllers/userController.js";
import { validateFieldCount, validateRequiredFields } from "psgutil";

const router = express.Router();

router.get("/data", authenticateToken, getUserData);
router.get("/orders", authenticateToken, getOrders);
router.get("/favourites", authenticateToken, getFavourites);
router.post("/favourites", authenticateToken, validateFieldCount(1), validateRequiredFields(["productId"]), setFavourite);

export default router;