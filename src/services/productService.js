import Product from "../models/Product.js";

// Create a new product
export const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

// Get all products (optional filter)
export const getAllProducts = async (filter = {}) => {
  return await Product.find(filter).populate("brandId").populate("reviewIds");
};

// Get a single product by ID
export const getProductById = async (id) => {
  return await Product.findById(id).populate("brandId").populate("reviewIds");
};

// Update product
export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Delete product
export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};
