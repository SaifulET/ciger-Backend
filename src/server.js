import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";

import { initSocket } from "./socket.js";
import http from "http";

import { userInfo } from "os";
import authRoutes from "./routes/auth.Route.js";
import ProuductRouter from "./routes/product.Route.js";
import brandRoute from "./routes/brandRoutes.js";
import blogRoute from "./routes/blog.route.js";
import reviewRoute from "./routes/review.Route.js";
;

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = initSocket(server);

// Middlewares

const allowedOrigins = [
  "http://localhost:5173",
  "*"
  
  
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // allow the request
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(morgan("dev"));
app.use(helmet());



// Routes placeholder
app.use("/auth",authRoutes)
app.use("/product",ProuductRouter)
app.use("/brand",brandRoute)
app.use("/blog",blogRoute);
app.use("/review",reviewRoute)


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
