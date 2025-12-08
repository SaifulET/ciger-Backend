import express from "express";
import { calculateTaxController } from "../controllers/tax.controller.js";

const taxRouter = express.Router();

// POST /api/tax/calculate
taxRouter.post("/calculateTax", calculateTaxController);

export default taxRouter;
