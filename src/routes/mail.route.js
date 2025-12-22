import express from "express";
import { mailController } from "../controllers/mail.controller.js";
import { sendOrderConfirmationMail, sendRefundConfirmationMail, trackingNumberController } from "../controllers/sendOrderConfirmationmail.controller.js";


const MailRouter = express.Router();

MailRouter.post("/createMail", mailController); 
MailRouter.post("/orderConfirmation",sendOrderConfirmationMail);
MailRouter.post("/refundConfirmation",sendRefundConfirmationMail);
MailRouter.post("/trackingNumber",trackingNumberController);


export default MailRouter;