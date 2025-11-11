import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  orderId: { type: String, unique: true }, // e.g. #10000
  date: { type: Date, default: Date.now },
  trackingNo: { type: String, default: "" },
  state: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled", "refunded"],
    default: "processing",
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isNextUsePayment: { type: Boolean, default: false },
  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
