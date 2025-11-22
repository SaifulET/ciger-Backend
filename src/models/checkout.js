import mongoose from "mongoose";

const checkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true }],
  totalAmount: { type: Number, required: true },
  shippingAddress: { type: String },
  paymentMethod: { type: String },
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Checkout", checkoutSchema);
