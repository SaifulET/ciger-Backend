import * as authService from "../services/admin.service.js";
import {  Emailschema, userschema } from "../utils/Validation.js";


// Signup
export const signup = async (req, res) => {
  try {
    console.log('kk')
   const result = userschema.safeParse({email:req.body.email , password: req.body.password});
  if (!result.success) {
    // Extract only messages you defined in the schema
    const messages = result.error.issues.map(err => err.message);

    return res.status(400).json({
      success: false,
      message: messages,   // 👈 only your custom messages
    });
  }
    const { admin, token } = await authService.signup(req.body);
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    res.status(201).json({ success: true, data: admin });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Signin
export const signin = async (req, res) => {
  try {
  const result = userschema.safeParse(req.body);
  if (!result.success) {
    // Extract only messages you defined in the schema
    const messages = result.error.issues.map(err => err.message);

    return res.status(400).json({
      success: false,
      message: messages,   // 👈 only your custom messages
    });
  }


    const { email, password } = req.body;

    console.log(email,password,'dd')
    const { admin, token } = await authService.signin(email, password);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    console.log(admin,"49")
    res.status(200).json({ success: true, data: admin , token});
  } catch (err) {
    console.log(err,"51")
    res.status(400).json({ success: false, message: err.message });
  }
};

// Signout
export const signout = async (req, res) => {
  try {
    console.log('abce')
    const data = await authService.signout(req,res);
    res.status(200).json({ success: true, message: data.message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await authService.forgotPassword(email);
    res.status(200).json({ success: true, message: data.message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const verifyOtpController = async (req, res) => {
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
    const result = await authService.verifyOtpService(email, otp);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Reset Password
export const resetPassword = async (req, res) => {
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

    const { email, password, confirmPassword } = req.body;
    console.log(req.body)
    const data = await authService.resetPassword(email,  password,confirmPassword,);
    res.status(200).json({ success: true, message: data.message });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};




export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.headers.user_id // from auth middleware or param
    console.log(adminId,"132")
    const admin = await authService.getAdminProfile(adminId);
    res.status(200).json({ success: true, data: admin });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.headers.user_id ;
    console.log(adminId)
    const data= req.body

    console.log(data,"145")
     if (req.file) {
  data.image = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.key}`;
}
console.log(data)
    const updatedAdmin = await authService.updateAdminProfileService(adminId,data);
    console.log(updatedAdmin)
    res.status(200).json({ success: true, data: updatedAdmin });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};








