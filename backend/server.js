import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { colorLog, errorLog } from "psgutil";
import { authenticateToken } from "./src/middlewares/auth.js";

import env from "./src/config/env.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import { getOrders } from "./src/controllers/productController.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(colorLog);

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.get("/orders", authenticateToken, getOrders);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

app.use(errorLog);