import express from "express";
import { mailController } from "../controllers/mail.controller.js";


const MailRouter = express.Router();

MailRouter.post("/createMail", mailController); 

export default MailRouter;