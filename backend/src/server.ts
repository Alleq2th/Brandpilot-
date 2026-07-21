import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import workspaceRoutes from "./routes/workspace.js";
import { errorHandler } from "./middleware/errorHandler.js";


// Load environment variables
dotenv.config();


const app: Application = express();


// =======================
// GLOBAL MIDDLEWARE
// =======================


app.use(
  cors({
    origin: "*",
    credentials: true
  })
);


app.use(
  helmet()
);


app.use(
  express.json()
);


app.use(
  express.urlencoded({
    extended: true
  })
);


app.use(
  morgan("dev")
);



// =======================
// ROUTES
// =======================


app.get(
  "/",
  (req: Request, res: Response) => {

    res.json({

      success: true,

      app: "BrandPilot API",

      version: "1.0.0",

      message: "AI Business Operating System Online 🚀"

    });

  }
);



// Authentication routes

app.use(
  "/api/auth",
  authRoutes
);



// Workspace routes

app.use(
  "/api/workspaces",
  workspaceRoutes
);



// =======================
// 404 ROUTE
// =======================

app.use(
  "*",
  (req: Request, res: Response) => {

    res.status(404).json({

      success: false,

      message: "Route not found"

    });

  }
);



// =======================
// ERROR HANDLER
// =======================

app.use(
  errorHandler
);



// =======================
// SERVER START
// =======================


const PORT =
process.env.PORT || 3000;


app.listen(
  PORT,
  () => {

    console.log(`
================================

🚀 BrandPilot Backend Running

PORT: ${PORT}

Environment:
${process.env.NODE_ENV || "development"}

================================
`);

  }
);
