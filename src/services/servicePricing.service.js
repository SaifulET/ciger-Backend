import ServicePricing from "../models/servicePricing.js";

// ✅ Create service pricing
export const createServicePricing = async (data) => {
  const existing = await ServicePricing.findOne();
  if (existing) throw new Error("Service pricing already exists. Use update instead.");
  return await ServicePricing.create(data);
};

// ✅ Update service pricing
export const updateServicePricing = async (id, data) => {
  const pricing = await ServicePricing.findById(id);
  
  if (!pricing) throw new Error("Service pricing not found");
  Object.assign(pricing, data);
  return await pricing.save();
};

// ✅ Get service pricing (assume only one entry)
export const getServicePricing = async () => {
  return await ServicePricing.findOne();
};
