import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import limiter from "./middlewares/rateLimiter.middleware.js";

const app = express();
const isProduction = process.env.NODE_ENV === "production";
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = isProduction
  ? {
      origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
      },
    }
  : {};

/* Security */
app.use(helmet());

/* Logging */
app.use(morgan("dev"));

/* Parsing */
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

/* CORS */
app.use(cors(corsOptions));

app.use(limiter);

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Task Tracker API",
    data: {
      name: "Task Tracker API",
      version: "1.0.0",
      status: "Running",
      endpoints: {
        health: "/api/health",
        tasks: "/api/tasks",
        statistics: "/api/tasks/stats",
      },
    },
  });
});

/* Health Check */
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Task Tracker API is running",
  });
});

/* API Routes */
app.use("/api", routes);

/* 404 */
app.use(notFound);

/* Global Error Handler */
app.use(errorHandler);

export default app;
