import * as reviewService from "../services/reviewService.js";

// ✅ Create a new review
export const createReview = async (req, res) => {
  try {
    console.log(req.body)
    
    const review = await reviewService.createReview({productId:req.body.productId,review:req.body.text,rating:req.body.rating,userId:req.body.userId});
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Get all reviews or by productId (?productId=)
export const getAllReviews = async (req, res) => {
  try {
    const filter = req.query.productId ? { productId: req.query.productId } : {};
    const reviews = await reviewService.getAllReviews(filter);

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update a review
export const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.body);
    if (!review) return res.status(404).json({ success: false, message: "Review not found" });
    res.status(200).json({ success: true, data: review });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Delete a review
export const deleteReview = async (req, res) => {
  try {
    const deleted = await reviewService.deleteReview(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Review not found" });
    res.status(200).json({ success: true, message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
