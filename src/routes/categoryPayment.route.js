import express from "express";
import {
  createOrUpdateCategoryPayment,
  getAllCategoryPayments,
  getCategoryPaymentsMonthYearController 
} from "../controllers/categoryPayment.controller.js";

const categoryPaymentRouter = express.Router();

// POST /api/category-payment → create or update category payment manually
categoryPaymentRouter.post("/createCategoryPayment", createOrUpdateCategoryPayment);

// GET /api/category-payment → list all with optional month/year filter + totals
categoryPaymentRouter.get("/getAllCategoryPayment", getAllCategoryPayments);

// GET /api/category-payment/calculate?month=11&year=2025 → calculate from orders
categoryPaymentRouter.get("/calculateTotalCategoryPayment", getCategoryPaymentsMonthYearController );

export default categoryPaymentRouter;
