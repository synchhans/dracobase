import {
  createDebuggingService,
  getDebuggingsService,
  updateDebuggingService,
  deleteDebuggingService,
} from "../services/debuggingService.js";

export const createDebuggingController = async (req, res, next) => {
  try {
    const { workspaceId, materialId, error, solution, debugLogs, resolved } =
      req.body;
    const newDebugging = await createDebuggingService({
      workspaceId,
      materialId,
      error,
      solution,
      debugLogs,
      resolved,
    });
    return res.status(201).json({
      message: "Debugging entry created successfully.",
      data: newDebugging,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDebuggingsController = async (req, res, next) => {
  try {
    const { workspaceId, materialId } = req.query;
    const debuggings = await getDebuggingsService(workspaceId, materialId);
    return res.status(200).json({
      message: "Debugging entries retrieved successfully.",
      data: debuggings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDebuggingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedDebugging = await updateDebuggingService(id, updateData);
    return res.status(200).json({
      message: "Debugging entry updated successfully.",
      data: updatedDebugging,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDebuggingController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteDebuggingService(id);
    return res.status(200).json({
      message: "Debugging entry deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};