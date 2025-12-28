// controllers/payment.controller.js

import axios from "axios";
import { createOrder } from "../services/order.Service.js";
// import { processPaymentService } from "../services/payment.service.js";

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `#${timestamp}-${random}`;
};

const parsePaymentResponse = (responseString) => {
  const result = {};
  try {
    // Split by & to get key-value pairs
    const pairs = responseString.split("&");

    pairs.forEach((pair) => {
      const [key, value] = pair.split("=");
      if (key && value !== undefined) {
        // Decode URL-encoded values
        result[key] = decodeURIComponent(value);
      }
    });

    return result;
  } catch (error) {
    console.error("Error parsing payment response:", error);
    return { error: "Failed to parse response" };
  }
};

export const processPaymentController = async (req, res) => {
  try {
    const { payment, shippingInfo, totals } = req.body;
    const orderNumber = generateOrderNumber();
    const payload = {
      type: "sale",
      security_key: process.env.ECRYPT_KEY_ID,
      payment_token: payment.paymentToken,
      amount: payment.amount,
      first_name: shippingInfo.firstName,
      last_name: shippingInfo.lastName,
      email: shippingInfo.email,
      orderid: orderNumber,
    };
    console.log(payload);

    const form = new URLSearchParams(payload).toString();
    const ECRYPT_API_URL =
      "https://ecrypt.transactiongateway.com/api/transact.php";

    const { data } = await axios.post(ECRYPT_API_URL, form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.log(data, "69");
    const parsedResponse = parsePaymentResponse(data);

    if (parsedResponse.transactionid) {
      const orderData = {
        firstName: shippingInfo.firstName,
        lastName: shippingInfo.lastName,
        email: shippingInfo.email,
        country: shippingInfo.country,
        address: shippingInfo.address,
        city: shippingInfo.city,
        stateName: shippingInfo.state,
        zipCode: shippingInfo.zipCode,
        apartment: shippingInfo.apartment,
        phone: shippingInfo.phone,
        tax: totals.tax,
        discount: totals.discount,
        shippingCost: totals.shipping,
        transactionId: parsedResponse.transactionid,

        isNextUsePayment: false,
        orderid: parsedResponse.orderid,
      };
      await createOrder(req.body.userId, orderData);
    }
    res.json({
      success: true,
      response: data,
      transactionid: parsedResponse.transactionid,
      orderid: parsedResponse.orderid,
    });
  } catch (err) {
    console.error("PAYMENT ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const refundPayment = async (req, res) => {
  try {
    const { transactionId, amount } = req.body;

    const formData = new URLSearchParams();
    formData.append("security_key", process.env.ECRYPT_SECURITY_KEY);
    formData.append("type", "credit");
    formData.append("transactionid", transactionId);
    if (amount) formData.append("amount", Number(amount).toFixed(2)); // optional for partial refund

    const response = await axios.post(
      "https://ecrypt.transactiongateway.com/api/transact.php",
      formData
    );

    console.log("Refund Response:", response.data);

    if (response.data.response === 1) {
      return res.json({ success: true, data: response.data });
    } else {
      return res.status(400).json({
        success: false,
        message: response.data.responsetext,
        gateway: response.data,
      });
    }
  } catch (error) {
    console.error("Refund Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

import qs from "qs";

export const RefundEcyptController = async (req, res) => {
  try {
    const { transactionId, amount } = req.body;

    if (!transactionId || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "transactionId and amount are required",
      });
    }

    // ✅ Fix floating amount
    const refundAmount = Number(amount).toFixed(2);

    // ✅ FORM DATA (NOT JSON)
    const payload = qs.stringify({
      security_key: process.env.ECRYPT_KEY_ID, // PRIVATE KEY
      type: "refund", // ❗ REQUIRED
      transactionid: transactionId,
      amount: refundAmount,
    });

    const response = await axios.post(process.env.ECRYPT_API_URL, payload, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      timeout: 15000,
    });

    console.log(response.data,"abc",refundAmount)
    return res.status(200).json({
      success: true,
      message: "Refund request sent to Ecrypt",
      data: response.data,
    });
  } catch (error) {
    console.error("Ecrypt Refund Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Refund failed",
      error: error.message,
    });
  }
};
