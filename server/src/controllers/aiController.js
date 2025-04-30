import Ai from "../models/Ai.js";
import { openRouterService } from "../services/openRouterService.js";
import { buildQuery } from "../utils/buildQuery.js";
import { cleanCode } from "../utils/codeCleaner.js";

export const handleAi = async (req, res, next) => {
  try {
    const { workspaceId, materialId, contentBlockId, query, type } = req.body;

    if (!workspaceId || !materialId || !contentBlockId || !query || !type) {
      return res.status(400).json({
        message:
          "Workspace ID, Material ID, ContentBlock ID, Type, dan Query wajib diisi.",
      });
    }

    const cleanedQuery = cleanCode(query);

    if (!cleanedQuery.trim()) {
      return res.status(400).json({
        message: "Query tidak mengandung kode valid.",
      });
    }

    const formattedQuery = buildQuery(cleanedQuery, type);

    const aiResponse = await openRouterService(formattedQuery);

    const responseContent =
      aiResponse.choices?.[0]?.message?.content || "No response";

    const aiData = {
      workspaceId,
      materialId,
      contentBlockId,
      query: cleanedQuery,
      response: responseContent,
      feedbackType: type,
    };

    const savedData = await Ai.create(aiData);

    return res.status(200).json({
      message: "AI berhasil diproses.",
      data: savedData,
    });
  } catch (error) {
    next(error);
  }
};

export const getDataAi = async (req, res) => {
  try {
    const { workspaceId, materialId, contentBlockId, type } = req.params;

    if (!workspaceId || !materialId || !contentBlockId || !type) {
      return res.status(400).json({
        success: false,
        message:
          "Workspace ID, Material ID, ContentBlock ID dan Type harus disertakan",
      });
    }

    const allowedTypes = ["debugging", "feedback"];
    if (!allowedTypes.includes(type.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: "Type tidak valid.",
      });
    }

    const dataAi = await Ai.find({
      workspaceId,
      materialId,
      contentBlockId,
      feedbackType: type,
    });

    if (!dataAi || dataAi.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      count: dataAi.length,
      data: dataAi,
    });
  } catch (error) {
    console.error("Error fetching AI data:", error);
    res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
      error: error.message,
    });
  }
};
