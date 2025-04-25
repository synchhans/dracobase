import Debugging from "../models/Debugging.js";

export const createDebuggingService = async (data) => {
  try {
    const newDebugging = new Debugging(data);
    return await newDebugging.save();
  } catch (error) {
    throw new Error("Failed to create debugging entry.");
  }
};

export const getDebuggingsService = async (workspaceId, materialId) => {
  try {
    const query = {};
    if (workspaceId) query.workspaceId = workspaceId;
    if (materialId) query.materialId = materialId;

    const debuggings = await Debugging.find(query).sort({ createdAt: -1 });
    return debuggings;
  } catch (error) {
    throw new Error("Failed to retrieve debugging entries.");
  }
};

export const updateDebuggingService = async (id, updateData) => {
  try {
    const updatedDebugging = await Debugging.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedDebugging) {
      throw new Error("Debugging entry not found.");
    }
    return updatedDebugging;
  } catch (error) {
    throw new Error("Failed to update debugging entry.");
  }
};

export const deleteDebuggingService = async (id) => {
  try {
    const deletedDebugging = await Debugging.findByIdAndDelete(id);
    if (!deletedDebugging) {
      throw new Error("Debugging entry not found.");
    }
  } catch (error) {
    throw new Error("Failed to delete debugging entry.");
  }
};