import express from "express";
import {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview
} from "../controllers/review.controller.js";

const reviewRoute = express.Router();

// ✅ Create new review
reviewRoute.post("/createReview", createReview);

// ✅ Get all reviews OR filter by productId (?productId=)
reviewRoute.get("/getAllReview", getAllReviews);

// ✅ Update review
reviewRoute.put("/updateReview/:id", updateReview);

// ✅ Delete review
reviewRoute.delete("/deleteReview/:id", deleteReview);

export default reviewRoute;
