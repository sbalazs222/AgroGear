import express from "express";
import { validateRequiredFields, validateFieldCount, validateInputIsArray } from "psgutil";
import { getProductsByCategory, getproductData, newProduct, deleteProduct, searchByName, sellBasket } from "../controllers/productController.js";
import { authenticateToken, requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/category/:category", authenticateToken, getProductsByCategory);
router.get("/search", authenticateToken, searchByName);
router.get("/data/:id", authenticateToken, getproductData);
router.post("/", authenticateToken, requireAdmin, validateRequiredFields(["name", "description", "price", "stock", "category", "attributes"]), validateFieldCount(6), validateInputIsArray(["attributes"]), newProduct);
router.delete("/:id", authenticateToken, requireAdmin, deleteProduct);
router.post("/checkout", authenticateToken, validateFieldCount(1), validateRequiredFields(["products"]), validateInputIsArray(["products"]), sellBasket);

export default router;