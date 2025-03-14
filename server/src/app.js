import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import connectDB from "./config/db.js";
import passport from "passport";

import authRoutes from "./routes/authRoutes.js";
import dashboardRouter from "./routes/dashboardRouter.js";
import masterRouter from "./routes/masterRouter.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

import "./config/passport.js";

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/master", masterRouter);

export default app;
