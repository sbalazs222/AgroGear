import express from "express";

import { authenticateToken } from "../middlewares/auth.js";
import { getUserData } from "../controllers/userController.js";

const router = express.Router();

router.get("/data", authenticateToken, getUserData);

export default router;