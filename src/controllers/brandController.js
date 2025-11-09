import * as brandService from "../services/brandService.js";

// Create brand
export const createBrand = async (req, res) => {
  try {
    const brand = await brandService.createBrand(req.body);
    res.status(201).json({ success: true, data: brand });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all brands
export const getAllBrands = async (req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.status(200).json({ success: true, count: brands.length, data: brands });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update brand
export const updateBrand = async (req, res) => {
  try {
    const brand = await brandService.updateBrand(req.params.id, req.body);
    if (!brand) return res.status(404).json({ success: false, message: "Brand not found" });
    res.status(200).json({ success: true, data: brand });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete brand
export const deleteBrand = async (req, res) => {
  try {
    const deleted = await brandService.deleteBrand(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Brand not found" });
    res.status(200).json({ success: true, message: "Brand deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
