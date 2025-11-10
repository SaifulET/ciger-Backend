import express from "express";
import {
  createServicePricing,
  updateServicePricing,
  getServicePricing
} from "../controllers/servicePricing.controller.js";

const ServicePricingRouter = express.Router();

ServicePricingRouter.post("/createServicePricing", createServicePricing);      // Create service pricing
ServicePricingRouter.get("/getServicePricing", getServicePricing);          // Get service pricing
ServicePricingRouter.put("/updateServicePricing/:id", updateServicePricing);    // Update service pricing by ID

export default ServicePricingRouter;
