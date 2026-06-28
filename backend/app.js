
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import limiter from "./middlewares/rateLimiter.middleware.js";

const app = express();

app.set("trust proxy", 1);

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

        callback(new Error("Not allowed by CORS"));
      },
      credentials: true,
    }
  : {
      origin: true,
      credentials: true,
    };

/* Security */
app.use(helmet());

/* Logger */
app.use(morgan("dev"));

/* Rate Limit */
app.use(limiter);

/* Body Parser */
app.use(express.json({ limit: "100kb" }));
app.use(express.urlencoded({ extended: true, limit: "100kb" }));

/* CORS */
app.use(cors(corsOptions));

/* Root */

app.get("/api", (req, res) => {
  res.json({
    success: true,
    statusCode: 200,
    message: "Task Tracker API",
  });
});

/* Health */

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Task Tracker API is running",
  });
});

/* Routes */

app.use("/api", routes);

/* 404 */

app.use(notFound);

/* Error */

app.use(errorHandler);

export default app;