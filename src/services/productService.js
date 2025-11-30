import { da } from "zod/v4/locales";
import Product from "../models/product.js";
import brand from "../models/brand.js";

// Create a new product
export const createProduct = async (data) => {
  console.log(data,"7no line")


 const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();

  const inputNameNormalized = normalize(data.name);
console.log(inputNameNormalized,'13')
  // Fetch all products only with name field (lightweight)
  const allProducts = await Product.find({}, { name: 1 });

  // Check duplicate by normalization
  const duplicate = allProducts.find(p => normalize(p.name) === inputNameNormalized);
console.log(duplicate,'19')
  if (duplicate) {
    return {
      success: false,
      message: "Product already exists",
      product: duplicate
    };
  }
  console.log("abc")
  if (data.brand ) {
    const brandDoc = await brand.findOne({ name: data.brand });
    console.log(brandDoc)

    if (!brandDoc) {
      
      // throw new Error(`Brand not found: ${data.brand}`);
    }

    // Replace brand name with brandId
    data.brandId = brandDoc._id;
  }

  // Remove brand field since product schema does not use it
  delete data.brand;
  console.log(data,"line23")

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

 let existingImages = [];
if (data.existingImages) {
  try {
    // If it's already an array, use it directly
    if (Array.isArray(data.existingImages)) {
      existingImages = data.existingImages;
    } else if (typeof data.existingImages === 'string') {
      // If it's a string, try to parse it as JSON
      existingImages = JSON.parse(data.existingImages);
    }
  } catch (error) {
    console.error('Error parsing existingImages:', error);
    existingImages = [];
  }
}

// Initialize data.images if it doesn't exist
if (!data.images) {
  data.images = [];
}

// Push existingImages to data.images
data.images.push(...existingImages);
     

    




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

  // Helper function to normalize string (remove spaces, lowercase)
 
  // ✅ First: Get ALL products from database
  let allProducts = await Product.find()
    .populate("brandId")
    .sort({ createdAt: -1 });


  // ✅ Second: Filter products in memory
  const filteredProducts = allProducts.filter(product => {
    // ✅ Filter by brand name (map brand name to brandId)
  

    // ✅ Filter by brandId
    

    // ✅ Filter by feature (best/new)
    if (filters.isBest && !product.isBest) {
      return false;
    }
    
    if (filters.isNew && !product.isNew) {
      return false;
    }

    
   

    // ✅ Filter by discount
    if (filters.discount && filters.discount === "true") {
      if (!product.discount || product.discount <= 0) {
        return false;
      }
    }

    return true;
  });

 

  return filteredProducts;
};






// Normalize string for flexible matching
const normalize = (str = "") => str.replace(/\s+/g, "").toLowerCase();

export const filterProductsService = async (keyword) => {
  const normalized = normalize(keyword);

  // Step 1 ----- Search by PRODUCT NAME
  let products = await Product.find() .populate("brandId")
    .sort({ createdAt: -1 });;
  let filteredByProduct = products.filter(p =>
    normalize(p.name).includes(normalized)
  );

  if (filteredByProduct.length > 0) {
    return filteredByProduct;
  }

  // Step 2 ----- Search by BRAND NAME
  const brands = await  brand.find();
  const matchedBrands = brands.filter(b =>
    normalize(b.name).includes(normalized)
  );

  if (matchedBrands.length === 0) {
    return []; // nothing found
  }

  const matchedBrandIds = matchedBrands.map(b => b._id);

  const productsByBrand = await Product.find({
    brandId: { $in: matchedBrandIds }
  }) .populate("brandId")
    .sort({ createdAt: -1 });;

  return productsByBrand;
};
