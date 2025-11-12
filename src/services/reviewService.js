import Review from "../models/review.js";

// ✅ Create a review
export const createReview = async (data) => {
  const review = new Review(data);
  return await review.save();
};

// ✅ Get all reviews or filter by productId
export const getAllReviews = async (filter = {}) => {
  return await Review.find(filter)
    .populate("userId", "name email")
    .populate("productId", "name title")
    .sort({ createdAt: -1 });
};

// ✅ Update review
export const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Delete review
export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};
