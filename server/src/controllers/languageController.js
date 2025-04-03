import {
  addLanguage,
  deleteLanguage,
  getAllLanguages,
  updateLanguage,
} from "../services/languageService.js";

export const addLanguageController = async (req, res, next) => {
  try {
    const { name, icon, description, link, categories, materials } = req.body;

    if (!name || !icon || !description || !link) {
      return res.status(400).json({
        message: "Nama, ikon, deskripsi, dan link halaman materi wajib diisi.",
      });
    }

    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({
        message: "Minimal 1 kategori harus dipilih.",
      });
    }

    if (
      !Array.isArray(materials) ||
      materials.some((material) => !material.title || !material.content)
    ) {
      return res.status(400).json({
        message: "Setiap materi harus memiliki judul dan isi.",
      });
    }

    const savedLanguage = await addLanguage(req.body);

    return res.status(201).json({
      message: "Bahasa pemrograman berhasil ditambahkan.",
      data: savedLanguage,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllLanguagesController = async (req, res, next) => {
  try {
    const languages = await getAllLanguages();
    return res.status(200).json({
      message: "Daftar bahasa pemrograman berhasil diambil.",
      data: languages,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLanguageController = async (req, res, next) => {
  try {
    const { name } = req.params;
    const updatedData = req.body;

    if (
      !updatedData.name &&
      !updatedData.icon &&
      !updatedData.description &&
      !updatedData.link
    ) {
      return res.status(400).json({
        message: "Setidaknya satu field harus diperbarui.",
      });
    }

    const updatedLanguage = await updateLanguage(name, updatedData);

    if (!updatedLanguage) {
      return res.status(404).json({ message: "Bahasa tidak ditemukan." });
    }

    return res.status(200).json({
      message: "Bahasa berhasil diperbarui.",
      data: updatedLanguage,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLanguageController = async (req, res, next) => {
  try {
    const { name } = req.params;

    const isDeleted = await deleteLanguage(name);

    if (!isDeleted) {
      return res.status(404).json({ message: "Bahasa tidak ditemukan." });
    }

    return res.status(200).json({ message: "Bahasa berhasil dihapus." });
  } catch (error) {
    next(error);
  }
};
