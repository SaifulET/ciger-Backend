import nodemailer from "nodemailer";
export const SignupmailService = async ({ email }) => {
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

  await transporter.verify(); // <-- forces auth test
console.log("abc")
  return transporter.sendMail({
    from: process.env.ZOHO_EMAIL,
    to: email,
    subject: "Welcome to Smokenza",
    html: '<p>Hello,</p> <p> Thank you for signing up on <a href="https://smokenza.com" target="_blank">smokenza.com</a>. </p> <p> Your account has been successfully created using this email address. You can now log in and start using our services. </p> <p> Best regards,<br /> <strong>Smokenza Team</strong><br /> <a href="https://smokenza.com" target="_blank">smokenza.com</a> </p>',
  });
};






export const RefundConfirmationMailService = async ({
  email,
  orderId,
  transactionId,
  refundAmount,
}) => {
  console.log(transactionId,refundAmount,"35")
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

  await transporter.verify();

  return transporter.sendMail({
    from: process.env.ZOHO_EMAIL,
    to: email,
    subject: "Refund Confirmation – Smokenza",
    html: `
      <p>Hello,</p>

      <p>Your refund has been successfully processed on 
        <a href="https://smokenza.com" target="_blank">smokenza.com</a>.
      </p>

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
          <td style="padding: 6px 0;"><strong>Refund Amount:</strong></td>
          <td style="padding: 6px 12px;">$${refundAmount}</td>
        </tr>
      </table>

      <p>
        The refunded amount will appear in your account within
        <strong>5–10 business days</strong>, depending on your bank.
      </p>

      <p>
        Best regards,<br />
        <strong>Smokenza Team</strong><br />
        <a href="https://smokenza.com" target="_blank">smokenza.com</a>
      </p>
    `,
  });
};