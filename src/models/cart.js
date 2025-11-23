import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, default: 1, min: 1 },
  total: { type: Number, default: 0 }, // quantity * product.price
  isSelected: { type: Boolean, default: true },
  isOrdered: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Cart", cartSchema);
