import Code from "../models/Code.js";

export const createCodeService = async (data) => {
  try {
    const newCode = new Code(data);
    return await newCode.save();
  } catch (error) {
    throw new Error("Failed to create code.");
  }
};

export const getCodesService = async (workspaceId, materialId) => {
  try {
    const query = {};
    if (workspaceId) query.workspaceId = workspaceId;
    if (materialId) query.materialId = materialId;

    const codes = await Code.find(query).sort({ createdAt: -1 });
    return codes;
  } catch (error) {
    throw new Error("Failed to retrieve codes.");
  }
};

export const updateCodeService = async (id, updateData) => {
  try {
    const updatedCode = await Code.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );
    if (!updatedCode) {
      throw new Error("Code not found.");
    }
    return updatedCode;
  } catch (error) {
    throw new Error("Failed to update code.");
  }
};

export const deleteCodeService = async (id) => {
  try {
    const deletedCode = await Code.findByIdAndDelete(id);
    if (!deletedCode) {
      throw new Error("Code not found.");
    }
  } catch (error) {
    throw new Error("Failed to delete code.");
  }
};