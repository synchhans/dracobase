import AIFeedback from "../models/AIFeedback.js";

export const createAIFeedbackService = async (data) => {
  try {
    const newFeedback = new AIFeedback(data);
    return await newFeedback.save();
  } catch (error) {
    throw new Error("Failed to create AI Feedback.");
  }
};

export const getAIFeedbacksService = async (workspaceId, materialId) => {
  try {
    const query = {};
    if (workspaceId) query.workspaceId = workspaceId;
    if (materialId) query.materialId = materialId;

    const feedbacks = await AIFeedback.find(query).sort({ createdAt: -1 });
    return feedbacks;
  } catch (error) {
    throw new Error("Failed to retrieve AI Feedbacks.");
  }
};

export const updateAIFeedbackService = async (id, updateData) => {
  try {
    const updatedFeedback = await AIFeedback.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedFeedback) {
      throw new Error("AI Feedback not found.");
    }
    return updatedFeedback;
  } catch (error) {
    throw new Error("Failed to update AI Feedback.");
  }
};

export const deleteAIFeedbackService = async (id) => {
  try {
    const deletedFeedback = await AIFeedback.findByIdAndDelete(id);
    if (!deletedFeedback) {
      throw new Error("AI Feedback not found.");
    }
  } catch (error) {
    throw new Error("Failed to delete AI Feedback.");
  }
};