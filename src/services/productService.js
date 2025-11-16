import Product from "../models/product.js";

// Create a new product
export const createProduct = async (data) => {

  const product = new Product(data);

  return await product.save();
};


// Get a single product by ID
export const getProductById = async (id) => {
  return await Product.findById(id).populate("brandId");
};

// Update product
export const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// Delete product
export const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};




export const getAllProducts = async (filters = {}) => {
  const query = {};

  // ✅ Filter by brand
  if (filters.brandId) {
    query.brandId = filters.brandId;
  }

  // ✅ Filter by feature (best/new)
  if (filters.isBest) {
   query.isBest = true;
  }
  // ✅ Filter by feature (best/new)
  if (filters.isNew) {
   query.isNew = true;
  }

  // ✅ Filter by category
  if (filters.category) {
    query.category = filters.category;
  }

  // ✅ Filter by category + subcategory
  if (filters.subCategory) {
    query.subCategory = filters.subCategory;
  }

  // ✅ Filter by discount (products having discount > 0)
  if (filters.discount && filters.discount === "true") {
    query.discount = { $gt: 0 };
  }
console.log(query)
  // Fetch products with relations
  return await Product.find(query)
    .populate("brandId")
    .sort({ createdAt: -1 });
};