import mongoose from "mongoose";

const userOrderHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cartIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart", required: true }],
  trackingNumber: { type: String, required: true, unique: true },
  placedDate: { type: Date, default: Date.now },
  orderState: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"],
    default: "Pending"
  },
}, { timestamps: true });

export default mongoose.model("UserOrderHistory", userOrderHistorySchema);
