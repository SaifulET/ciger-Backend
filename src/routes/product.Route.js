import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { uploadMiddleware } from "../middlewares/awsUpload.middleware.js";

const ProuductRouter = express.Router();

// Create product
ProuductRouter.post("/createProduct",uploadMiddleware.array("images", 10), createProduct);

// Get all products
ProuductRouter.get("/getAllProduct", getProducts);

// Get single product
ProuductRouter.get("/getProductById/:id", getProductById);

// Update product
ProuductRouter.put("/updateProductById/:id",uploadMiddleware.array("images", 10), updateProduct);

// Delete product
ProuductRouter.delete("/deleteProductById/:id", deleteProduct);

export default ProuductRouter;
