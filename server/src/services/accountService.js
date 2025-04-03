import User from "../models/User.js";

export const getAccounts = async () => {
  try {
    const account = await User.find().sort({ createdAt: 1 });
    return account;
  } catch (error) {
    throw new Error(error.message || "Gagal mengambil daftar account.");
  }
};

export const editAccount = async (id, level, status) => {
  try {
    const updatedAccount = await User.findByIdAndUpdate(
      id,
      { level, status },
      { new: true }
    );

    if (!updatedAccount) {
      throw new Error("Account tidak ditemukan.");
    }

    return updatedAccount;
  } catch (error) {
    throw new Error(error.message || "Gagal memperbarui account.");
  }
};

export const deleteAccount = async (id) => {
  try {
    const deletedAccount = await User.findByIdAndDelete(id);

    if (!deletedAccount) {
      throw new Error("Account tidak ditemukan.");
    }

    return deletedAccount;
  } catch (error) {
    throw new Error(error.message || "Gagal menghapus account.");
  }
};
