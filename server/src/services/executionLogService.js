import ExecutionLog from "../models/ExecutionLog.js";

export const createExecutionLogService = async (data) => {
  try {
    const newExecutionLog = new ExecutionLog(data);
    return await newExecutionLog.save();
  } catch (error) {
    throw new Error("Failed to create execution log.");
  }
};

export const getExecutionLogsService = async (workspaceId, materialId) => {
  try {
    const query = {};
    if (workspaceId) query.workspaceId = workspaceId;
    if (materialId) query.materialId = materialId;

    const executionLogs = await ExecutionLog.find(query).sort({
      executedAt: -1,
    });
    return executionLogs;
  } catch (error) {
    throw new Error("Failed to retrieve execution logs.");
  }
};

export const updateExecutionLogService = async (id, updateData) => {
  try {
    const updatedExecutionLog = await ExecutionLog.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedExecutionLog) {
      throw new Error("Execution log not found.");
    }
    return updatedExecutionLog;
  } catch (error) {
    throw new Error("Failed to update execution log.");
  }
};

export const deleteExecutionLogService = async (id) => {
  try {
    const deletedExecutionLog = await ExecutionLog.findByIdAndDelete(id);
    if (!deletedExecutionLog) {
      throw new Error("Execution log not found.");
    }
  } catch (error) {
    throw new Error("Failed to delete execution log.");
  }
};