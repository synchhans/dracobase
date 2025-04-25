import {
  createExecutionLogService,
  getExecutionLogsService,
  updateExecutionLogService,
  deleteExecutionLogService,
} from "../services/executionLogService.js";

export const createExecutionLogController = async (req, res, next) => {
  try {
    const { workspaceId, materialId, input, output, error, executionTime } =
      req.body;
    const newExecutionLog = await createExecutionLogService({
      workspaceId,
      materialId,
      input,
      output,
      error,
      executionTime,
    });
    return res.status(201).json({
      message: "Execution log created successfully.",
      data: newExecutionLog,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllExecutionLogsController = async (req, res, next) => {
  try {
    const { workspaceId, materialId } = req.query;
    const executionLogs = await getExecutionLogsService(
      workspaceId,
      materialId
    );
    return res.status(200).json({
      message: "Execution logs retrieved successfully.",
      data: executionLogs,
    });
  } catch (error) {
    next(error);
  }
};

export const updateExecutionLogController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedExecutionLog = await updateExecutionLogService(id, updateData);
    return res.status(200).json({
      message: "Execution log updated successfully.",
      data: updatedExecutionLog,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteExecutionLogController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteExecutionLogService(id);
    return res.status(200).json({
      message: "Execution log deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};