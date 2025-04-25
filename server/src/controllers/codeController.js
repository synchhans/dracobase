import {
  createCodeService,
  getCodesService,
  updateCodeService,
  deleteCodeService,
} from "../services/codeService.js";

export const createCodeController = async (req, res, next) => {
  try {
    const { workspaceId, materialId, content, editorSettings } = req.body;
    const newCode = await createCodeService({
      workspaceId,
      materialId,
      content,
      editorSettings,
    });
    return res.status(201).json({
      message: "Code created successfully.",
      data: newCode,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCodesController = async (req, res, next) => {
  try {
    const { workspaceId, materialId } = req.query;
    const codes = await getCodesService(workspaceId, materialId);
    return res.status(200).json({
      message: "Codes retrieved successfully.",
      data: codes,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCodeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedCode = await updateCodeService(id, updateData);
    return res.status(200).json({
      message: "Code updated successfully.",
      data: updatedCode,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCodeController = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteCodeService(id);
    return res.status(200).json({
      message: "Code deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};