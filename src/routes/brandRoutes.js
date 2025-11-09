import express from "express";
import {
  createBrand,
  getAllBrands,
  updateBrand,
  deleteBrand
} from "../controllers/brandController.js";

const brandRoute = express.Router();

// Create new brand
brandRoute.post("/createBrand", createBrand);

// Get all brands
brandRoute.get("/getAllBrands", getAllBrands);

// Update brand
brandRoute.put("/updateBrand/:id", updateBrand);

// Delete brand
brandRoute.delete("/deleteBrand/:id", deleteBrand);

export default brandRoute;
