import express from "express";
import {
  createExecutionLogController,
  getAllExecutionLogsController,
  updateExecutionLogController,
  deleteExecutionLogController,
} from "../controllers/executionLogController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";

const executionLogRouter = express.Router();

executionLogRouter.post("/", isProfileCompleted, createExecutionLogController);
executionLogRouter.get("/", isProfileCompleted, getAllExecutionLogsController);
executionLogRouter.put(
  "/:id",
  isProfileCompleted,
  updateExecutionLogController
);
executionLogRouter.delete(
  "/:id",
  isProfileCompleted,
  deleteExecutionLogController
);

export default executionLogRouter;