// controllers/adminController.js

import { allEmployee, SetEmployeePassword, signup, updateEmployeeApproval, verifyEmployeeOtpService } from "../services/employee.service.js";

import {  Emailschema, userschema } from "../utils/Validation.js";
export const employeeSignupController = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Validate input
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // 2️⃣ Call service
    const result = await signup({ email });

    // 3️⃣ Response
    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      adminId: result.admin._id,
    });

  } catch (error) {
    console.error("Signup Controller Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


export const verifyEmployeeOtpController = async (req, res) => {
  try {
    const results = Emailschema.safeParse({email:req.body.email });
  if (!results.success) {
    // Extract only messages you defined in the schema
    const messages = results.error.issues.map(err => err.message);

    return res.status(400).json({
      success: false,
      message: messages,   // 👈 only your custom messages
    });
  }
    
    const { email, otp } = req.body;
    const result = await verifyEmployeeOtpService(email, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const setEmployeePasswordController = async (req, res) => {
  try {
    const result = userschema.safeParse({email:req.body.email, password:req.body.password});
  if (!result.success) {
    // Extract only messages you defined in the schema
    const messages = result.error.issues.map(err => err.message);

    return res.status(400).json({
      success: false,
      message: messages,   // 👈 only your custom messages
    });
  }

    const { email, password, confirmPassword,firstName,lastName } = req.body;
    const data = await SetEmployeePassword(email,  password,confirmPassword,firstName,lastName);
    res.status(200).json({ success: true, message: data.message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const allEmployeeController = async (req, res) => {
  try {

    const employees = await allEmployee();
    return res.status(200).json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error("Get All Employee Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};


export const updateEmployeeApprovalController = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { approval } = req.body;

    // strict boolean validation
    if (approval !== true && approval !== false) {
      return res.status(400).json({
        success: false,
        message: "Approval must be true or false",
      });
    }

    const employee = await updateEmployeeApproval({
      employeeId,
      approval,
    });

    return res.status(200).json({
      success: true,
      message: `Employee ${approval ? "approved" : "rejected"} successfully`,
      data: employee,
    });
  } catch (error) {
    console.error("Employee Approval Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update employee approval",
    });
  }
};