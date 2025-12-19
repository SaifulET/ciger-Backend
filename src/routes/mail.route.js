import express from "express";
import { mailController } from "../controllers/mail.controller.js";
import { sendOrderConfirmationMail } from "../controllers/sendOrderConfirmationmail.controller.js";


const MailRouter = express.Router();

MailRouter.post("/createMail", mailController); 
MailRouter.post("/orderConfirmation",sendOrderConfirmationMail);

export default MailRouter;