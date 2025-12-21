import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String },
    orderId:{type:String},
    status: {
      type: String,
      enum: ["placed", "shipped", "delivered", "cancelled", "refunded","processing"],
      default: "placed",
    },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);

