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
    
    if(product.success===false)
    res.status(201).json({ success: false,message:"product Already exist"});
  else
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.log(err)
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get products (with filters)
export const getProducts = async (req, res) => {
  try {
    const filters = {
      
      discount: req.query.discount,
      isBest: req.query.best,
      isNew: req.query.new 
    };
    
    const products = await productService.getAllProducts(filters);
  
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (err) { 
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




export const filterProductsController = async (req, res) => {
  try {
    console.log("d")
    const { keyword } = req.params;
    console.log(",",keyword)

    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const products = await productService.filterProductsService(keyword);

    return res.status(200).json({
      success: true,
      count: products.length,
      data:products,
    });

  } catch (error) {
    console.error("Product filter error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export const getRelatedProductsController = async (req, res) => {
  try {
    const { productId } = req.params;
console.log(productId)
    const products = await productService.getRelatedProductsService(productId);

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};



