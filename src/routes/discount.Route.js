import express from "express";
import {
  createDiscount,
  getAllDiscounts,
  getDiscountById,
  updateDiscountById,
  deleteDiscountById,
  getDiscountByCode
} from "../controllers/discount.controller.js";

const discountRouter = express.Router();

discountRouter.post("/createDiscount", createDiscount);           // Create discount
discountRouter.get("/getAllDiscount", getAllDiscounts);          // Get all discounts
discountRouter.get("/getDiscountById/:id", getDiscountById);       // Get discount by ID
discountRouter.put("/updateDiscountById/:id", updateDiscountById);    // Update discount by ID
discountRouter.delete("/deleteDiscountById/:id", deleteDiscountById); // Delete discount by ID

discountRouter.get("/getDiscountByCode/:code", getDiscountByCode);

export default discountRouter;
