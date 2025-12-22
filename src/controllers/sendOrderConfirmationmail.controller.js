import Order from "../models/order.js";
import { OrderConfirmationMailService } from "../services/orderMail.service.js";
import {
  CancelMailService,
  receiveMailService,
  RefundConfirmationMailService,
  shippedMailService,
  trackingNumber,
} from "../services/signupmail.service.js";

export const sendOrderConfirmationMail = async (req, res) => {
  try {
    const { email, orderId, transactionId, totalAmount } = req.body;
    console.log(req.body);

    // Basic validation
    if (!email || !orderId || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "email, orderId and totalAmount are required",
      });
    }

    // Transaction ID validation
    if (!transactionId || transactionId.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Transaction ID is missing or invalid",
      });
    }

    await OrderConfirmationMailService({
      email,
      orderId,
      transactionId,
      totalAmount,
    });

    return res.status(200).json({
      success: true,
      message: "Order confirmation email sent successfully",
    });
  } catch (error) {
    console.error("Order confirmation mail error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send order confirmation email",
      error: error.message,
    });
  }
};

export const sendRefundConfirmationMail = async (req, res) => {
  try {
    const { email, orderId, transactionId, Amount, status } = req.body;

    const order = await Order.findOne(
      { orderid: orderId },
      { trackingNo: 1, _id: 0 }
    ).lean();

    const trackingNo = order?.trackingNo || 0;
    if (status == "refunded")
      await RefundConfirmationMailService({
        email,
        orderId,
        transactionId,
        Amount,
        trackingNo,
      });
    if (status == "cancelled")
      await CancelMailService({
        email,
        orderId,
        transactionId,
        Amount,
        trackingNo,
      });
    if (status == "delivered") {
      await receiveMailService({
        email,
        orderId,
        transactionId,
        trackingNo,
      });
    }
    if (status == "shipped")
      await shippedMailService({
        email,
        orderId,
        transactionId,
        trackingNo,
      });

    return res.status(200).json({
      success: true,
      message: "Refund confirmation email sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send refund confirmation email",
      error: error.message,
    });
  }
};
export const trackingNumberController = async (req, res) => {
  try {
    const { orderId, trackingNo } = req.body;
    console.log(req.body, "reqbody");
    const order = await Order.findOne(
      { _id: orderId },
      { transactionId: 1, orderid: 1, state: 1, email: 1, _id: 0 }
    ).lean();
    const transactionId = order?.transactionId || 0;
    const Status = order?.state || "processing";
    const email = order?.email || "";
    const orderid = order?.orderid || "";
    console.log(order, "130");

    await trackingNumber({
      email,
      orderId: orderid,
      transactionId,
      trackingNo,
      Status,
    });
    return res.status(200).json({
      success: true,
      message: "Tracking number sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send tracking number email",
      error: error.message,
    });
  }
};
