import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Checkout" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  amount: { type: Number },
  method: { type: String },
  transactionId: { type: String },
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
