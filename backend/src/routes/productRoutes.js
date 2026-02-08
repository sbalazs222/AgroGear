import express from "express";
import { validateRequiredFields, validateFieldCount } from "psgutil";
import { getProductsByCategory, newProduct } from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/category/:category", authenticateToken, getProductsByCategory);
router.post("/", authenticateToken, validateRequiredFields(["name", "description", "price", "stock", "category"]), validateFieldCount(5), newProduct);
export default router;