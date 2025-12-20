import { OrderConfirmationMailService } from "../services/orderMail.service.js";
import { RefundConfirmationMailService } from "../services/signupmail.service.js";

export const sendOrderConfirmationMail = async (req, res) => {
  try {
    const { email, orderId, transactionId, totalAmount } = req.body;
    console.log(req.body)

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
    
    const {
      email,
      orderId,
      transactionId,
      refundAmount,
    } = req.body;

    

    await RefundConfirmationMailService({
      email,
      orderId,
      transactionId,
      refundAmount,
    });

    return res.status(200).json({
      success: true,
      message: "Refund confirmation email sent successfully",
    });
  } catch (error) {
    console.error("Refund confirmation mail error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send refund confirmation email",
      error: error.message,
    });
  }
};
