
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORDS
  }
});
export const OtpSentService = async ({ email, otp }) => {
  try {
    await transporter.sendMail({
      from: `"Dashboard Access" <${process.env.ZOHO_EMAIL}>`,
      to: "support@smokenza.com", 
      replyTo: email,
      subject: "Dashboard Access Request – OTP Verification",
      text: `
A new dashboard access request has been received.

Employee Email: ${email}
One-Time Password (OTP): ${otp}

This OTP will expire in 5 minutes.
If you did not request this, please ignore this email.
      `.trim(),
    });

    return { message: "OTP email sent successfully" };
  } catch (error) {
    console.error("Zoho Mail Error:", error);
    throw new Error("Failed to send OTP email");
  }
};