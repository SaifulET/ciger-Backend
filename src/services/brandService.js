import Brand from "../models/brand.js";

// ✅ Create new brand
export const createBrand = async (data) => {
  console.log(data,"line5")
  const brand = new Brand(data);
  
  return await brand.save();
};

// ✅ Get all brands
export const getAllBrands = async () => {
  return await Brand.find().sort({ createdAt: -1 });
};

// ✅ Update brand
export const updateBrand = async (id, data) => {
  console.log(data)
  return await Brand.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Delete brand
export const deleteBrand = async (id) => {
  return await Brand.findByIdAndDelete(id);
};


export const getBrandByIdService = async (id) => {
  const brand = await Brand.findById(id);
  return brand;
};