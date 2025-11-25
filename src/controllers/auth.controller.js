import * as authService from "../services/auth.service.js";
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
    const { user, token } = await authService.signup(req.body);
    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Strict" });
    res.status(201).json({ success: true, data: user });
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
    

    const { user, token } = await authService.signin(email, password);
       res.cookie("token", token, {
      httpOnly: false,      // frontend can read it
      secure: true,         // required for Render (HTTPS)
      sameSite: "None",     // required for cross-domain
      path: "/",            // ensure frontend can access anywhere
    });
    res.status(200).json({ success: true, data: user , token});
  } catch (err) {
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
    console.log(email,otp)
    const result = await authService.verifyOtpService(email, otp);
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};


// Reset Password
export const resetPassword = async (req, res) => {
  try {
    console.log(req.body)
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
    console.log("kk")
    res.status(400).json({ success: false, message: err.message });
  }
};









