import express from "express";
import { mailController } from "../controllers/mail.controller.js";
import { sendOrderConfirmationMail, sendRefundConfirmationMail } from "../controllers/sendOrderConfirmationmail.controller.js";


const MailRouter = express.Router();

MailRouter.post("/createMail", mailController); 
MailRouter.post("/orderConfirmation",sendOrderConfirmationMail);
MailRouter.post("/refundConfirmation",sendRefundConfirmationMail);

export default MailRouter;