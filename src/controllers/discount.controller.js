import * as discountService from "../services/discount.service.js";

// ✅ Create discount
export const createDiscount = async (req, res) => {
  try {
    const discount = await discountService.createDiscount(req.body.codeData);
    res.status(201).json({ success: true, data: discount });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Get all discounts
export const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await discountService.getAllDiscounts();
    res.status(200).json({ success: true, count: discounts.length, data: discounts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get discount by ID
export const getDiscountById = async (req, res) => {
  try {
    const discount = await discountService.getDiscountById(req.params.id);
    if (!discount) return res.status(404).json({ success: false, message: "Discount not found" });
    res.status(200).json({ success: true, data: discount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update discount by ID
export const updateDiscountById = async (req, res) => {
  try {
    const discount = await discountService.updateDiscountById(req.params.id, req.body.codeData);
    console.log(discount,"kdkd")
    res.status(200).json({ success: true, data: discount });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Delete discount by ID
export const deleteDiscountById = async (req, res) => {
  try {
    await discountService.deleteDiscountById(req.params.id);
    res.status(200).json({ success: true, message: "Discount deleted successfully" });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};
