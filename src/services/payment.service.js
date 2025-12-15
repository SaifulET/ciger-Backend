import axios from "axios";
export const processPaymentService = async ({ paymentToken, amount, currency }) => {
  const paymentData = {
    api_username: process.env.ECRYPT_API_USERNAME,
    api_password: process.env.ECRYPT_API_PASSWORD,
    payment_token: paymentToken,
    amount,
    currency,
  };

  const response = await axios.post(process.env.ECRYPT_API_URL, paymentData);


  return response.data;
  
};