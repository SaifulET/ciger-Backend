import Discount from "../models/discount.js";

// ✅ Create a discount
export const createDiscount = async (data) => {
  const existing = await Discount.findOne({ code: data.code });
  if (existing) throw new Error("Discount code already exists");
  return await Discount.create(data);
};

// ✅ Get all discounts
export const getAllDiscounts = async () => {
  return await Discount.find().sort({ createdAt: -1 });
};

// ✅ Get discount by ID
export const getDiscountById = async (id) => {
  return await Discount.findById(id);
};

// ✅ Update discount by ID
export const updateDiscountById = async (id, data) => {
  const discount = await Discount.findById(id);
  if (!discount) throw new Error("Discount not found");
  Object.assign(discount, data);
  return await discount.save();
};

// ✅ Delete discount by ID
export const deleteDiscountById = async (id) => {
  const discount = await Discount.findByIdAndDelete(id);
  if (!discount) throw new Error("Discount not found");
  return discount;
};
