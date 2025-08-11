import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import pool from "./config/database"; // MySQL pool
import bcrypt from "bcrypt";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Root route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Multi-Shop!");
});

// API Routes
app.use("/api", routes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log("✅ MySQL Database connected successfully");
  } catch (error) {
    console.error("❌ Failed to connect to MySQL Database:", error);
  }

  console.log(
    `🚀 Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});
