import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

// Load environment variables
dotenv.config();

const app: Application = express();

// =======================
// Middleware
// =======================

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// =======================
// Health Check
// =======================

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    app: "BrandPilot API",
    version: "1.0.0",
    status: "Running 🚀",
    message: "Welcome to BrandPilot Backend"
  });
});

// =======================
// API Status
// =======================

app.get("/api", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "BrandPilot API Ready"
  });
});

// =======================
// 404 Handler
// =======================

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// =======================
// Server
// =======================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
=====================================
🚀 BrandPilot Backend Started
=====================================
Server: http://localhost:${PORT}
Environment: ${process.env.NODE_ENV || "development"}
=====================================
`);
});
