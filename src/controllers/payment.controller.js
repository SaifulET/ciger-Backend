// controllers/payment.controller.js

import axios from "axios";
import { processPaymentService } from "../services/payment.service.js";

export const processPaymentController = async (req, res) => {
 const { encryptedCard, amount, currency } = req.body.body;
console.log("Received payment request:",req.body.body, encryptedCard, amount, currency);
  try {
    const payload = {
      api_username: process.env.ECRYPT_API_USERNAM,
      api_password: process.env.ECRYPT_API_PASSWORD,
      key_id: process.env.ECRYPT_KEY_ID,
      card_data: encryptedCard,
      amount,
      currency,
    };

    const response = await axios.post(
      process.env.ECRYPT_API_URL,
      payload
    );

    return res.json(response.data);
  } catch (err) {
    return res.status(500).json({
      message: "Payment failed",
      error: err.response?.data || err.message,
    });
  }
}
