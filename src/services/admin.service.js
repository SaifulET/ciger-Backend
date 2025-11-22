import Admin from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import SendEmail from "./email.service.js"; // implement email sending
import { OAuth2Client } from "google-auth-library";
import { JWT_EXPIRE_TIME, JWT_KEY, JWT_KEY_ADMIN } from "../config/token.config.js";
import admin from "../models/admin.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Signup
export const signup = async (data) => {
  const { email, password, firstName,lastName } = data;

  // Check for existing user first
  const existingUser = await Admin.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists with this email");
  }
  // if (password !== confirmPassword) {
  //   throw new Error("Password and confirmPassword isn't same");
  // }

  if (password.length < 6) {
    throw new Error("password must be alteast 6 characters");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = new Admin({
      email,
      password: hashedPassword,
      firstName:firstName,
      lastName:lastName
    });
    

    const token = jwt.sign({ id: admin._id }, JWT_KEY_ADMIN, {
      expiresIn: JWT_EXPIRE_TIME || "7d",
    });
    console.log("kdkd");

    await admin.save();
    console.log(admin)

    return { admin, token };
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      console.log(error);
      throw new Error("Admin User already exists");
    }
    throw error;
  }
};

// Signin
export const signin = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) throw new Error("User not found");
  if(admin.isSignin) throw new Error("Already Logedin")

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign({ id: admin._id }, JWT_KEY_ADMIN, {
    expiresIn: JWT_EXPIRE_TIME || "7d",
  });
  // admin.isSignin= true;
  admin.save()
  return { admin, token };
};

// Signout
export const signout = async (req, res) => {
  try {
 
    res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
    const Id= req.headers.user_id
    await Admin.findByIdAndUpdate({_id:Id},{ isSignin:false }, 
      { new: true })
    

    return { message: "Signed out successfully" };
  } catch (error) {
    console.log(error.json);
  }
};
// Forgot Password → Send OTP
export const forgotPassword = async (email) => {
  console.log("lksdlksd");
  const admin = await Admin.findOne({ email });

  if (!admin) throw new Error("User not found");

  const otp = crypto.randomInt(1000, 9999).toString(); // 4-digit OTP
  admin.otp = otp;
  console.log(otp, "jflskd");
  admin.otpExpires = Date.now() + 5 * 60 * 1000; // 10 mins
  await admin.save();

  // Send OTP to email
  console.log(email);
  await SendEmail(
    email,
    `The Otp is ${otp}. And it valid for 5 mins `,
    `Your OTP is ${otp}`
  );

  return { message: "OTP sent to email" };
};

export const verifyOtpService = async (email, otp) => {
  const admin = await Admin.findOne({ email });

  if (!admin) throw new Error("Admin User not found");

  if (!admin.otp || !admin.otpExpires) throw new Error("OTP not requested");

  if (admin.otp !== otp) throw new Error("Invalid OTP");
  if (admin.otpExpires < Date.now()) throw new Error("OTP expired");

  // ✅ OTP valid → clear OTP
  admin.otp = null;
  admin.otpExpires = null;
  await admin.save();

  return { message: "OTP verified successfully", email };
};

// Reset Password → Verify OTP & Update
export const resetPassword = async (email, password, confirmPassword) => {
  console.log(password);
  if (password !== confirmPassword) {
    throw new Error("Password and confirmPassword isn't same");
  }
  console.log(password.length);
  if (password.length < 6) {
    throw new Error("password must be alteast 6 characters");
  }
  const admin = await Admin.findOne({ email });
  if (!admin) throw new Error("Admin User not found");
  console.log(admin.password);

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  try {
    const admin = await Admin.findOneAndUpdate(
      { email }, // find user by email
      { password: hashedPassword }, // update password or any field
      { new: true } // return the updated document
    );

    return { admin };
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      console.log(error);
      throw new Error("Error");
    }
    throw error;
  }
};





export const getAdminProfile = async (adminId) => {
  const admin = await Admin.findById(adminId).select("-password");
  if (!admin) throw new Error("admin  not found");
  return admin;
};

export const updateAdminProfileService = async (adminId, updateData) => {

console.log(updateData,"188")
  const updatedUser = await admin.findByIdAndUpdate(
    adminId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updatedUser) throw new Error("admin not found");

  console.log(updatedUser,'189')
  return updatedUser;
};
