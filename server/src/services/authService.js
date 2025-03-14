import User from "../models/User.js";

export const updateUserProfile = async (userId, updates) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...updates,
        updatedAt: Date.now(),
        isProfileComplete: true,
      },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
