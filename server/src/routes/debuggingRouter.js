import express from "express";

import isProfileCompleted from "../middlewares/isProfileCompleted.js";
import {
  createDebuggingController,
  deleteDebuggingController,
  getAllDebuggingsController,
  updateDebuggingController,
} from "../controllers/debuggingController.js";

const debuggingRouter = express.Router();

debuggingRouter.post("/", isProfileCompleted, createDebuggingController);
debuggingRouter.get("/", isProfileCompleted, getAllDebuggingsController);
debuggingRouter.put("/:id", isProfileCompleted, updateDebuggingController);
debuggingRouter.delete("/:id", isProfileCompleted, deleteDebuggingController);

export default debuggingRouter;
