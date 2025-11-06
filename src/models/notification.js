import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Checkout" },
  orderState: { type: String },
  time: { type: Date, default: Date.now },
  message: { type: String },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("UserNotification", notificationSchema);
