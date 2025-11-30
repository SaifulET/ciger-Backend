
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_APP_PASSWORD
  }
});
export const mailService=async(data)=>{
     const { email, subject, message } = data;

try {
    await transporter.sendMail({
      from: process.env.ZOHO_EMAIL, // Zoho email sends the message
      to: process.env.ZOHO_EMAIL,   // receive in your inbox
      subject: subject,
      text: `From: ${email}\n\n${message}` // include user email in body
    });

    return ({ message: "Message sent successfully!" });
  } catch (error) {
    // console.error(error);
    return ({ err: "Failed to send message." });
  }
}