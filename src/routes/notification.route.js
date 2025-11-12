import express from "express";
import {
  createNotification,
  getUserNotifications,
} from "../controllers/notification.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";


const notificationRoute = express.Router();

// POST create notification
notificationRoute.post("/createNotification", authCheck,createNotification);

// GET all notifications of a user
notificationRoute.get("/getNotifications/:userId",authCheck,  getUserNotifications);

export default notificationRoute;
