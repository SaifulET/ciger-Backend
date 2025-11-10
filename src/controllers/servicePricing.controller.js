import * as servicePricingService from "../services/servicePricing.service.js";

// ✅ Create
export const createServicePricing = async (req, res) => {
  try {
    const pricing = await servicePricingService.createServicePricing(req.body);
    res.status(201).json({ success: true, data: pricing });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Update
export const updateServicePricing = async (req, res) => {
  try {
    const pricing = await servicePricingService.updateServicePricing(req.params.id, req.body);
    res.status(200).json({ success: true, data: pricing });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Get
export const getServicePricing = async (req, res) => {
  try {
    const pricing = await servicePricingService.getServicePricing();
    if (!pricing) return res.status(404).json({ success: false, message: "Service pricing not found" });
    res.status(200).json({ success: true, data: pricing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
