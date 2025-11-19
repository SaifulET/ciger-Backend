import * as productService from "../services/productService.js";

// Create product
export const createProduct = async (req, res) => {
  try {
    let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file =>
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`
      );
    }
    const data = req.body;
    data.images=imageUrls;
    const product = await productService.createProduct(data);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get products (with filters)
export const getProducts = async (req, res) => {
  try {
    const filters = {
      brand: req.query.brand,
      category: req.query.category,
      subCategory: req.query.subCategory,
      discount: req.query.discount,
      isBest: req.query.best,
      isNew: req.query.new 
    };
    
    console.log(filters);
    const products = await productService.getAllProducts(filters);
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) { 
    console.log(err)
    res.status(500).json({ success: false, message: err.message });
  }
};


// Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    console.log(product,'46')
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
     let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file =>
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`
      );
    }
    const data = req.body;
    data.images=imageUrls;
    console.log("a")
    const updated = await productService.updateProduct(req.params.id, data);
    console.log(updated,"abcd")
    if (!updated) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Product not found" });
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
