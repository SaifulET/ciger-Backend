import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const ProuductRouter = express.Router();

// Create product
ProuductRouter.post("/createProduct", createProduct);

// Get all products
ProuductRouter.get("/getAllProduct", getProducts);

// Get single product
ProuductRouter.get("/getProductById/:id", getProductById);

// Update product
ProuductRouter.put("/updateProductById/:id", updateProduct);

// Delete product
ProuductRouter.delete("/deleteProductById/:id", deleteProduct);

export default ProuductRouter;
