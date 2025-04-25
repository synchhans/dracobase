import express from "express";
import {
  createAIFeedbackController,
  getAllAIFeedbacksController,
  updateAIFeedbackController,
  deleteAIFeedbackController,
} from "../controllers/aiFeedbackController.js";
import isProfileCompleted from "../middlewares/isProfileCompleted.js";

const aiFeedbackRouter = express.Router();

aiFeedbackRouter.post("/", isProfileCompleted, createAIFeedbackController);
aiFeedbackRouter.get("/", isProfileCompleted, getAllAIFeedbacksController);
aiFeedbackRouter.put("/:id", isProfileCompleted, updateAIFeedbackController);
aiFeedbackRouter.delete("/:id", isProfileCompleted, deleteAIFeedbackController);

export default aiFeedbackRouter;
