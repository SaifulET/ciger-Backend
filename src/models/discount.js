import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  percentage: { type: Number, required: true, min: 0, max: 100 },
  description: { type: String },
}, { timestamps: true });

export default mongoose.model("Discount", discountSchema);
