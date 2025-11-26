import mongoose from "mongoose";

const BreakdownSchema = new mongoose.Schema(
  {
    month: { type: String, required: true },
    year: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Breakdown", BreakdownSchema);
