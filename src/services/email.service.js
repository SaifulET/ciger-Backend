import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Debug logging
console.log("Environment check:");
console.log("- ZOHO_EMAIL exists:", !!process.env.ZOHO_EMAIL);
console.log("- ZOHO_APP_PASSWORD exists:", !!process.env.ZOHO_APP_PASSWORDS);

// Validate credentials immediately
if (!process.env.ZOHO_EMAIL || !process.env.ZOHO_APP_PASSWORDS) {
  throw new Error(
    "Zoho email credentials are missing. Please check your .env file.\n" +
    "Required: ZOHO_EMAIL and ZOHO_APP_PASSWORD"
  );
}

// Create transporter with better error handling
let transporter;
try {
  transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.ZOHO_EMAIL.trim(),
      pass: process.env.ZOHO_APP_PASSWORDS.trim()
    },
    // Additional connection options
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 10000,
    socketTimeout: 10000,
    // Debug logging
    logger: process.env.NODE_ENV === "development",
    debug: process.env.NODE_ENV === "development"
  });

  // Verify connection
  transporter.verify(function (error, success) {
    if (error) {
      console.error("SMTP Connection Error:", error);
    } else {
      console.log("✅ SMTP Server is ready to send emails");
    }
  });
} catch (error) {
  console.error("Failed to create transporter:", error);
  throw error;
}

const SendEmail = async (EmailTo, EmailText, EmailSubject) => {
  // Input validation
  if (!EmailTo || !EmailText || !EmailSubject) {
    return { error: "Missing required parameters" };
  }

  try {
    const mailOptions = {
      from: `"Smokenza" <${process.env.ZOHO_EMAIL}>`,
      to: EmailTo,
      subject: EmailSubject,
      text: EmailText,
      // Optional: HTML version
      html: `<div style="font-family: Arial, sans-serif; padding: 20px;">
               ${EmailText.replace(/\n/g, '<br>')}
             </div>`
    };

    console.log(`Sending email to: ${EmailTo}`);
    console.log(`Subject: ${EmailSubject}`);
    
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully. Message ID:", info.messageId);
    
    return {
      success: true,
      message: "Email sent successfully",
      messageId: info.messageId
    };

  } catch (error) {
    console.error("❌ Email sending failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    
    // More specific error messages
    let userMessage = "Failed to send email";
    
    if (error.code === 'EAUTH') {
      if (error.command === 'API') {
        userMessage = "Email authentication failed. Please check your Zoho email credentials.";
      } else {
        userMessage = "Authentication error. Invalid email or password.";
      }
    } else if (error.code === 'ESOCKET') {
      userMessage = "Network error. Could not connect to email server.";
    } else if (error.code === 'ECONNECTION') {
      userMessage = "Connection to email server failed.";
    }
    
    return {
      error: true,
      message: userMessage,
      technical: process.env.NODE_ENV === "development" ? error.message : undefined
    };
  }
};

export default SendEmail;