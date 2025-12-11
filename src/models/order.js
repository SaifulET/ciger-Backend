import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  orderId: { type: String, unique: true },

  // formatted date string: "Sep 22, 2025"
  date: { type: String, default: "" },

  trackingNo: { type: String, default: "" },

  state: {
    type: String,
    enum: ["processing", "shipped", "delivered", "cancelled", "refunded"],
    default: "processing", // ✔ always processing initially
  },

  tax: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  shippingCost: { type: Number, default: 0 },
  subtotal: { type: Number, default: 0 },
  total: { type: Number, default: 0 },

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isNextUsePayment: { type: Boolean, default: false },

  carts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cart" }],
  transactionId: { type: String, default: "" }
}, { timestamps: true });


// ⭐ Auto-format date before saving
orderSchema.pre("save", function (next) {
  if (!this.date) {
    const now = new Date();
    const options = { year: "numeric", month: "short", day: "2-digit" };
    this.date = now.toLocaleDateString("en-US", options);  
  }
  next();
});

export default mongoose.model("Order", orderSchema);
