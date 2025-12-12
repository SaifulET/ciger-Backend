import express from "express";
import {
  createNotification,
  getAllNotificationsController,
  getUserNotifications,
} from "../controllers/notification.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import {authChecks} from "../middlewares/authForAdmin.middleware.js"


const notificationRoute = express.Router();

// POST create notification
notificationRoute.post("/createNotification", createNotification);

// GET all notifications of a user
notificationRoute.get("/getNotifications/:userId",  getUserNotifications);

notificationRoute.get("/getAllNotifications",  getAllNotificationsController);


export default notificationRoute;
