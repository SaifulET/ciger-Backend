import express from "express";
import { processPaymentController, RefundEcyptController } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment", processPaymentController);


paymentRouter.post("/refund",RefundEcyptController);

export default paymentRouter;