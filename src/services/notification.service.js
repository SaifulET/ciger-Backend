import Notification from "../models/notification.js";
import User from "../models/user.model.js";

/**
 * Generate message automatically based on status
 */
const generateMessage = (status) => {
  switch (status) {
    case "placed":
      return "Order has been placed";
    case "shipped":
      return "Order has been shipped";
    case "delivered":
      return "Order has been delivered";
    case "refunded":
      return "Your cancelled order has been marked as refunded";
    case "cancelled":
      return "Order has been cancelled";
    default:
      return "You have a new notification";
  }
};

/**
 * Create notification
 */
export const createNotification = async (data) => {
  const { userId, orderId, status } = data;

  if (!userId) throw new Error("UserId is required");

  // Fetch user name automatically
  const user = await User.findById(userId).select("name");
  const userName = user?.name || "Unknown";

  const message = generateMessage(status);

  const notification = await Notification.create({
    userId,
    userName,
    orderId,
    status,
    message,
  });

  return formatNotification(notification);
};

/**
 * Get notifications by user
 */
export const getNotificationsByUser = async (userId) => {
  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(20);

  return notifications.map(formatNotification);
};


export const getAllNotifications = async () => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(20);

  return notifications.map(formatNotification);
};

// Helper: format like your example
const formatNotification = (n) => ({
  id: n._id,
  userId: n.userId,
  userName: n.userName,
  orderId: n.orderId,
  status: n.status,
  message: n.message,
  timestamp: timeAgo(n.createdAt),
});

// Simple timestamp formatter
function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}
