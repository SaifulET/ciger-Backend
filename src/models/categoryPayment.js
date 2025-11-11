import mongoose from "mongoose";

const categoryPaymentSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: [
      "Tobacco Products",
      "Hokkah",
      "Nicotine Vapes",
      "Smokeless",
      "General Accessories",
      "THC"
    ],
    required: true,
  },
  totalPayment: {
    type: Number,
    default: 0,
  },
  totalRefund: {
    type: Number,
    default: 0,
  },
  month: {
    type: Number, // 1–12
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model(
  "CategoryPayment",
  categoryPaymentSchema
);
