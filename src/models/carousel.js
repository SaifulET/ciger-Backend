import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Carousel", carouselSchema);
