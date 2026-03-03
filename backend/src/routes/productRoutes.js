import express from "express";
import { validateRequiredFields, validateFieldCount, validateInputIsArray } from "psgutil";
import { getProductsByCategory, getproductData, newProduct, deleteProduct, sellProduct, searchByName } from "../controllers/productController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/category/:category", authenticateToken, getProductsByCategory);
router.get("/search", authenticateToken, searchByName);
router.get("/data/:id", authenticateToken, getproductData);
router.post("/", authenticateToken, validateRequiredFields(["name", "description", "price", "stock", "category", "attributes"]), validateFieldCount(6), validateInputIsArray(["attributes"]), newProduct);
router.delete("/:id", authenticateToken, deleteProduct);
router.post("/:id/sell", authenticateToken, validateRequiredFields(["quantity"]), validateFieldCount(1), sellProduct);

export default router;