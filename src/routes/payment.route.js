import express from "express";
import { processPaymentController } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment", processPaymentController);

export default paymentRouter;