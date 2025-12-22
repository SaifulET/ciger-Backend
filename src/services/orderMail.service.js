
import nodemailer from "nodemailer";

export const OrderConfirmationMailService = async ({
  email,
  orderId,
  transactionId,
  totalAmount,
}) => {
    console.log(email,orderId,transactionId,totalAmount,"10")
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL.trim(),
      pass: process.env.ZOHO_APP_PASSWORDS.trim(),
    },
    authMethod: "LOGIN",
  });

  // Force auth check
  await transporter.verify();

  return transporter.sendMail({
    from:process.env.ZOHO_EMAIL,
    to: email,
    subject: "Order Confirmation – Smokenza",
    html: `
      <p>Hello,</p>

      <p>Thank you for your order on 
        <a href="https://smokenza.com" target="_blank">smokenza.com</a>.
      </p>

      <p><strong>Your order has been successfully confirmed.</strong></p>

      <table style="border-collapse: collapse;">
        <tr>
          <td style="padding: 6px 0;"><strong>Order ID:</strong></td>
          <td style="padding: 6px 12px;">${orderId}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Transaction ID:</strong></td>
          <td style="padding: 6px 12px;">${transactionId}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Total Amount:</strong></td>
          <td style="padding: 6px 12px;">$${totalAmount.toFixed(2)}</td>
        </tr>
      </table>

      <p>You can log in to your account to view order details.</p>

      <p>
        Best regards,<br />
        <strong>Smokenza Team</strong><br />
        
      </p>
    `,
  });
};
