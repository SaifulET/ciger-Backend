import mongoose from "mongoose";

const servicePricingSchema = new mongoose.Schema({
  shippingCost: { type: Number, required: true, min: 0 },
  AdvertisingText: { type: String, default: "" },
  MinimumFreeShipping: { type: Number, required: true, min: 0 },
}, { timestamps: true });

export default mongoose.model("ServicePricing", servicePricingSchema);
