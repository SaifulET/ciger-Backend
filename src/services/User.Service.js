import User from "../models/user.model.js";

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

export const updateUserProfile = async (userId, updateData) => {
  const allowedFields = [
    "firstName", "lastName", "name", "email", "phone", "image",
    "country", "city", "address", "postal", "houseNo", "suffix"
  ];

  const filteredData = {};
  allowedFields.forEach(field => {
    if (updateData[field] !== undefined) filteredData[field] = updateData[field];
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: filteredData },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) throw new Error("User not found");
  return updatedUser;
};
