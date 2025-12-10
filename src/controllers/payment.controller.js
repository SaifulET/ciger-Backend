// controllers/payment.controller.js

import axios from "axios";
// import { processPaymentService } from "../services/payment.service.js";

export const processPaymentController = async (req, res) => {


 try {
    const {
     payment,
    shippingInfo
    } = req.body;

    const payload = {
      type: "sale",
      security_key: process.env.ECRYPT_KEY_ID,
      payment_token: payment.paymentToken,
      amount: payment.amount,
      first_name: shippingInfo.firstName,
      last_name: shippingInfo.lastName,
      email: shippingInfo.email,
    };
console.log("payload", payload);
    const form = new URLSearchParams(payload).toString();
    const ECRYPT_API_URL = "https://ecrypt.transactiongateway.com/api/transact.php";


    const { data } = await axios.post(ECRYPT_API_URL, form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    res.json({ success: true, response: data });
  } catch (err) {
    console.error("PAYMENT ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
}
