import * as notificationService from "../services/notification.service.js";

export const createNotification = async (req, res) => {
  try {
    const data=req.body;
    data.userId= req.headers.user_id;
    const notification = await notificationService.createNotification(data);
    res.status(201).json({ success: true, data: notification });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.headers.user_id;
    const notifications = await notificationService.getNotificationsByUser(userId);
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const getAllNotificationsController = async (req, res) => {
  try {
    const notifications = await notificationService.getAllNotifications();
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
