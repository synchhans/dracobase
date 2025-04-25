import express from "express";
import {
  createCodeController,
  getAllCodesController,
  updateCodeController,
  deleteCodeController,
} from "../controllers/codeController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";

const codeRouter = express.Router();

codeRouter.post("/", isProfileCompleted, createCodeController);
codeRouter.get("/", isProfileCompleted, getAllCodesController);
codeRouter.put("/:id", isProfileCompleted, updateCodeController);
codeRouter.delete("/:id", isProfileCompleted, deleteCodeController);

export default codeRouter;