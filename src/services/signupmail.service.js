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