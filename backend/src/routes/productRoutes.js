import express from "express";
import { getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

router.get("/category/:category", getProductsByCategory);

export default router;