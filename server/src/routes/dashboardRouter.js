import express from "express";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import { fetchDataUser } from "../controllers/userController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", isProfileCompleted, fetchDataUser);

export default dashboardRouter;
