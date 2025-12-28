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
  Amount,
  trackingNo
}) => {
  console.log(Amount)
  // Add validation to ensure Amount exists and is a number
  if (Amount === undefined || Amount === null) {
   
  }

  // Convert Amount to number and handle potential string values
  const amountNum = Number(Amount);
  
  // Validate that Amount is a valid number
  if (isNaN(amountNum)) {
  }

  // Use toFixed(2) to ensure 2 decimal places for currency
  const dollar = amountNum.toFixed(2);
  
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL?.trim(),
      pass: process.env.ZOHO_APP_PASSWORDS?.trim(),
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
          <td style="padding: 6px 12px;">${orderId || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Transaction ID:</strong></td>
          <td style="padding: 6px 12px;">${transactionId || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0;"><strong>Tracking ID:</strong></td>
          <td style="padding: 6px 12px;">${trackingNo || 'N/A'}</td>
        </tr>
       
        <tr>
          <td style="padding: 6px 0;"><strong>Refund Amount:</strong></td>
          <td style="padding: 6px 12px;">$${dollar}</td>
        </tr>
      </table>

      <p>
        The refunded amount will appear in your account within
        <strong>5–10 business days</strong>, depending on your bank.
      </p>

      <p>
        Best regards,<br />
        <strong>Smokenza Team</strong><br />
      </p>
    `,
  });
};
export const CancelMailService = async ({
  email,
  orderId,
  transactionId,
  Amount,trackingNo
}) => {
  console.log(transactionId,Amount,"35")
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
  subject: "Your Order Has Been Cancelled & Refunded – Smokenza",
html: `
  <p>Hello,</p>

  <p>
    We’re sorry to inform you that your order has been <strong>cancelled</strong>.
    We understand this may be disappointing, and we sincerely apologize for
    any inconvenience caused.
  </p>

  <p>
    The good news is that your <strong>refund has been successfully processed</strong>
    through <a href="https://smokenza.com" target="_blank">smokenza.com</a>.
  </p>

  <table style="border-collapse: collapse; margin-top: 10px;">
    <tr>
      <td style="padding: 6px 0;"><strong>Order ID:</strong></td>
      <td style="padding: 6px 12px;">${orderId}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Transaction ID:</strong></td>
      <td style="padding: 6px 12px;">${transactionId}</td>
    </tr>
     <tr>
          <td style="padding: 6px 0;"><strong>Tracking ID:</strong></td>
          <td style="padding: 6px 12px;">${trackingNo}</td>
        </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Refund Amount:</strong></td>
      <td style="padding: 6px 12px;">$${Amount.toFixed(2)}</td>
    </tr>
  </table>

  <p>
    Please allow <strong>5–10 business days</strong> for the refunded amount to
    appear in your account, depending on your bank or payment provider.
  </p>

  <p>
    If you have any questions or need further assistance, our support team is
    always here to help. We truly appreciate your patience and understanding.
  </p>

  <p>
    Kind regards,<br />
    <strong>Smokenza Support Team</strong>
  </p>
`

  });
};
export const receiveMailService = async ({
  email,
  orderId,
  transactionId,trackingNo
}) => {
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
    subject: "Your Order Has Been Delivered – Smokenza",
  html: `
  <p>Hello,</p>

  <p>
    We’re happy to let you know that your order has been
    <strong>successfully delivered</strong>. We hope everything arrived safely
    and meets your expectations.
  </p>

  <p>
    Here are your order details from
    <a href="https://smokenza.com" target="_blank">smokenza.com</a>:
  </p>

  <table style="border-collapse: collapse; margin-top: 10px;">
    <tr>
      <td style="padding: 6px 0;"><strong>Order ID:</strong></td>
      <td style="padding: 6px 12px;">${orderId}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Transaction ID:</strong></td>
      <td style="padding: 6px 12px;">${transactionId}</td>
    </tr>
     <tr>
          <td style="padding: 6px 0;"><strong>Tracking ID:</strong></td>
          <td style="padding: 6px 12px;">${trackingNo}</td>
        </tr>
  </table>

  <p>
    If there’s anything not quite right with your order, please contact our
    support team—we’ll be glad to assist you.
  </p>

  <p>
    Thank you for shopping with Smokenza. We truly appreciate your business and
    hope to serve you again soon.
  </p>

  <p>
    Warm regards,<br />
    <strong>Smokenza Support Team</strong>
  </p>
`
,
  });
};
export const shippedMailService = async ({
  email,
  orderId,
  transactionId,trackingNo
}) => {
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
    subject: "Your Order Has Been Shipped – Smokenza",
   html: `
  <p>Hello,</p>

  <p>
    Great news! 🎉 Your order has been <strong>successfully shipped</strong> and is
    now on its way to you.
  </p>

  <p>
    Below are the details of your shipment from
    <a href="https://smokenza.com" target="_blank">smokenza.com</a>:
  </p>

  <table style="border-collapse: collapse; margin-top: 10px;">
    <tr>
      <td style="padding: 6px 0;"><strong>Order ID:</strong></td>
      <td style="padding: 6px 12px;">${orderId}</td>
    </tr>
    <tr>
      <td style="padding: 6px 0;"><strong>Transaction ID:</strong></td>
      <td style="padding: 6px 12px;">${transactionId}</td>
    </tr>
     <tr>
          <td style="padding: 6px 0;"><strong>Tracking ID:</strong></td>
          <td style="padding: 6px 12px;">${trackingNo}</td>
        </tr>
  </table>

  <p>
    Your package is being carefully handled and is expected to arrive within the
    estimated delivery timeframe. Once available, you will receive tracking
    details to follow your shipment.
  </p>

  <p>
    If you have any questions or need assistance, our support team is always ready
    to help.
  </p>

  <p>
    Thank you for choosing Smokenza. We truly appreciate your trust in us!
  </p>

  <p>
    Best regards,<br />
    <strong>Smokenza Team</strong>
  </p>
`
,
  });
};
export const trackingNumber= async({ email,
  orderId,
  transactionId,trackingNo,Status})=>{

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
    subject: "Tracking Number Added for Your Order – Smokenza",
   html: `
  <p>Hello,</p>

<p>
  We’re happy to let you know that a <strong>tracking number has been added</strong>
  to your order. Your package is now on its way!
</p>

<table style="border-collapse: collapse; margin-top: 12px;">
  <tr>
    <td style="padding: 6px 0;"><strong>Order ID:</strong></td>
    <td style="padding: 6px 12px;">${orderId}</td>
  </tr>
  <tr>
    <td style="padding: 6px 0;"><strong>Transaction ID:</strong></td>
    <td style="padding: 6px 12px;">${transactionId}</td>
  </tr>
  <tr>
    <td style="padding: 6px 0;"><strong>Tracking Number:</strong></td>
    <td style="padding: 6px 12px;">${trackingNo}</td>
  </tr>
  <tr>
    <td style="padding: 6px 0;"><strong>Order Status:</strong></td>
    <td style="padding: 6px 12px;">${Status}</td>
  </tr>
</table>

<p style="margin-top: 12px;">
  You can use the tracking number above to follow your shipment with the courier.
</p>

<p>
  If you have any questions or need assistance, feel free to contact our support team.
</p>

<p>
  Thank you for shopping with <strong>Smokenza</strong>!
</p>

<p>
  Best regards,<br />
  <strong>Smokenza Team</strong>
</p>

`
,
  });


}

