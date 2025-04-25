import {
  createAIFeedbackService,
  getAIFeedbacksService,
  updateAIFeedbackService,
  deleteAIFeedbackService,
} from "../services/aiFeedbackService.js";

export const createAIFeedbackController = async (req, res, next) => {
  try {
    const {
      workspaceId,
      materialId,
      query,
      response,
      feedbackType,
      confidenceScore,
      source,
    } = req.body;
    const newFeedback = await createAIFeedbackService({
      workspaceId,
      materialId,
      query,
      response,
      feedbackType,
      confidenceScore,
      source,
    });
    return res.status(201).json({
      message: "AI Feedback created successfully.",
      data: newFeedback,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllAIFeedbacksController = async (req, res, next) => {
  try {
    const { workspaceId, materialId } = req.query;
    const feedbacks = await getAIFeedbacksService(workspaceId, materialId);
    return res.status(200).json({
      message: "AI Feedbacks retrieved successfully.",
      data: feedbacks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAIFeedbackController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedFeedback = await updateAIFeedbackService(id, updateData);
    return res.status(200).json({
      message: "AI Feedback updated successfully.",
      data: updatedFeedback,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAIFeedbackController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteAIFeedbackService(id);
    return res.status(200).json({
      message: "AI Feedback deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};