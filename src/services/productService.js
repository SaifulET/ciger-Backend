import { da } from "zod/v4/locales";
import Product from "../models/product.js";
import brand from "../models/brand.js";

// Create a new product
export const createProduct = async (data) => {
  console.log(data,"7no line")
  if (data.brand && data.brand.trim() !== "") {
    const brandDoc = await brand.findOne({ name: data.brand });

    if (!brandDoc) {
      
      // throw new Error(`Brand not found: ${data.brand}`);
    }

    // Replace brand name with brandId
    data.brandId = brandDoc._id;
  }

  // Remove brand field since product schema does not use it
  delete data.brand;

  const product = new Product(data);

  return await product.save();
};


// Get a single product by ID
export const getProductById = async (id) => {
  return await Product.findById(id).populate("brandId");
};

// Update product
export const updateProduct = async (id, data) => {
  console.log("b");
  console.log(data,"23 line");

  // If brand name is provided, convert it to brandId
  if (data.brand && data.brand.trim() !== "") {
    const brandDoc = await brand.findOne({ name: data.brand });

    if (!brandDoc) {
      
      // throw new Error(`Brand not found: ${data.brand}`);
    }

    // Replace brand name with brandId
    data.brandId = brandDoc._id;
  }

  // Remove brand field since product schema does not use it
  delete data.brand;

  // Update product
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