import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: String }],
  title: { type: String },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  available: { type: Number, default: 0 },
  quantity:{type:String,default: 0},
  isBest: { type: Boolean, default: false },
  isNew: { type: Boolean, default: false },
  isInStock: { type: Boolean, default: true },
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
  category: { type: String },
  subCategory: { type: String },
  colors: [{ type: String }],
  description: { type: String },
  
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
