import Admin from "../models/admin.js";
import crypto from "crypto";
import { OtpSentService } from "./employeeMainService.js";
import bcrypt from "bcrypt";

export const signup = async (data) => {
  const { email } = data;

  if (!email) {
    throw new Error("Email is required");
  }

  const otp = crypto.randomInt(1000, 9999).toString();
  const otpExpires = Date.now() + 5 * 60 * 1000;

  try {
    let admin = await Admin.findOne({ email });

    if (!admin) {
      admin = new Admin({
        email,
        otp,
        otpExpires,
      });
    } else {
      admin.otp = otp;
      admin.otpExpires = otpExpires;
    }

    // ✅ Save first
    await admin.save();

    // ✅ Then send OTP
    await OtpSentService({ email, otp });

    return { admin };

  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Email already exists");
    }
    throw error;
  }
};


export const verifyEmployeeOtpService = async (email, otp) => {
  const admin = await Admin.findOne({ email });

  if (!admin) throw new Error("Admin User not found");

  if (!admin.otp || !admin.otpExpires) throw new Error("OTP not requested");

  if (admin.otp !== otp) throw new Error("Invalid OTP");
  if (admin.otpExpires < Date.now()) throw new Error("OTP expired");

  // ✅ OTP valid → clear OTP
  admin.otp = null;
  admin.otpExpires = null;
  admin.approval=true;
  await admin.save();

  return { message: "OTP verified successfully", email };
};

export const SetEmployeePassword = async (email, password, confirmPassword,firstName,lastName) => {
  if (password !== confirmPassword) {
    throw new Error("Password and confirmPassword isn't same");
  }
  if (password.length < 6) {
    throw new Error("password must be alteast 6 characters");
  }
  const admin = await Admin.findOne({ email,approval: true });
  if (!admin) throw new Error("Admin User not found");
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
   const admin = await Admin.findOneAndUpdate(
  { email },
  {
    $set: {
      password: hashedPassword,
      firstName,
      lastName,
    },
  },
  { new: true }
);
    return { admin };
  } catch (error) {
    if (error.code === 11000) {
      console.log(error);
      throw new Error("Error");
    }
    throw error;
  }
};


export const allEmployee = async () => {
  const employees = await Admin.find({})
    .select("-password -otp -otpExpires") 
    .sort({ createdAt: -1 })              
    .lean();

  return employees;
};

export const updateEmployeeApproval = async ({ employeeId, approval }) => {
  // strict boolean guard (extra safety)
  if (approval !== true && approval !== false) {
    throw new Error("Approval must be true or false");
  }
console.log(employeeId,approval,"abc")
  const employee = await Admin.findByIdAndUpdate(
    employeeId,
    { $set: { approval: approval } },
    { new: true }
  ).select("-password -otp -otpExpires");

  if (!employee) {
    throw new Error("Employee not found");
  }

  return employee;
};
