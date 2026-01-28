import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { colorLog, errorLog } from "psgutil";

import env from "./src/config/env.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use(colorLog);

app.use("/auth", authRoutes);

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

app.use(errorLog);
