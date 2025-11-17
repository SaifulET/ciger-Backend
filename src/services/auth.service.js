import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import SendEmail from "./email.service.js"; // implement email sending
import { OAuth2Client } from "google-auth-library";
import { JWT_EXPIRE_TIME, JWT_KEY } from "../config/token.config.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// Signup
export const signup = async (data) => {
  const { email, password, firstName,lastName } = data;

  // Check for existing user first
  const existingUser = await User.findOne({ email });

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
    const user = new User({
      email,
      password: hashedPassword,
      
    });

    const token = jwt.sign({ id: user._id }, JWT_KEY, {
      expiresIn: JWT_EXPIRE_TIME || "7d",
    });
    console.log(token);

    await user.save();

    return { user, token };
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      console.log(error);
      throw new Error("User already exists");
    }
    throw error;
  }
};

// Signin
export const signin = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");
 

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign({ id: user._id }, JWT_KEY, {
    expiresIn: JWT_EXPIRE_TIME || "7d",
  });
  user.isSignin= true;
  user.save()
  return { user, token };
};

// Signout
export const signout = async (req, res) => {
  try {
    console.log("ab");
    res.clearCookie("token", { httpOnly: true, sameSite: "Strict" });
    const Id= req.headers.user_id
    await User.findByIdAndUpdate({_id:Id},{ isSignin:false }, 
      { new: true })
    console.log("kdkd");

    return { message: "Signed out successfully" };
  } catch (error) {
    console.log(error.json);
  }
};
// Forgot Password → Send OTP
export const forgotPassword = async (email) => {
  console.log("lksdlksd");
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const otp = crypto.randomInt(1000, 9999).toString(); // 4-digit OTP
  user.otp = otp;
  console.log(otp, "jflskd");
  user.otpExpires = Date.now() + 5 * 60 * 1000; // 10 mins
  await user.save();

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
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");


  if (!user.otp || !user.otpExpires) throw new Error("OTP not requested");
    

  if (user.otp !== otp) return { message: "OTP InValid" };
  if (user.otpExpires < Date.now())  return { message:"OTP expired" };

  // ✅ OTP valid → clear OTP
  user.otp = null;
  user.otpExpires = null;
  await user.save();

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
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  console.log(user.password);

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);
  try {
    const user = await User.findOneAndUpdate(
      { email }, // find user by email
      { password: hashedPassword }, // update password or any field
      { new: true } // return the updated document
    );

    return { user };
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      console.log(error);
      throw new Error("Error");
    }
    throw error;
  }
};
