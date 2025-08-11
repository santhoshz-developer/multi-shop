import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import logger from "./utils/logger";
import pool from "./config/database"; // ✅ Import MySQL pool
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    logger.info("✅ MySQL Database connected successfully");
  } catch (err) {
    logger.error("❌ Failed to connect to MySQL Database:", err);
  }

  logger.info(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
