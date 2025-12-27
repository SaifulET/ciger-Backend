import Review from "../models/review.js";

// ✅ Create a review
export const createReview = async (data) => {
  console.log("dld",data,"dld")
  const review = new Review(data);
  return await review.save();
};

// ✅ Get all reviews or filter by productId


export const getAllReviews = async (filter = {}) => {
  // Fetch reviews with populated product and user
  const reviews = await Review.find(filter)
    .populate("userId", "firstName lastName email location image")
    .populate("productId", "name title") // populate product info
    .sort({ createdAt: -1 });

  // Filter out reviews where productId doesn't exist
  const validReviews = reviews.filter(review => review.productId !== null);

  return validReviews;
};


// ✅ Update review
export const updateReview = async (id, data) => {
  return await Review.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Delete review
export const deleteReview = async (id) => {
  return await Review.findByIdAndDelete(id);
};
