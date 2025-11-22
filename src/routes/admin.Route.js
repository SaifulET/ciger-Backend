import express from "express";
import { signup, signin, forgotPassword, resetPassword, signout, verifyOtpController, getAdminProfile, updateAdminProfile,  } from "../controllers/admin.controller.js";
import { authChecks } from "../middlewares/authForAdmin.middleware.js";
import { SingleuploadMiddleware } from "../middlewares/awsUpload.middleware.js";
const adminRoutes = express.Router();



adminRoutes.post("/signup",signup )
adminRoutes.post("/signin", signin)
adminRoutes.post("/forget-password",forgotPassword )
adminRoutes.post("/verifyOtp",verifyOtpController )

adminRoutes.post("/reset-password", resetPassword)

adminRoutes.post("/signout",authChecks, signout)

adminRoutes.get("/getAdmin",authChecks,getAdminProfile)
adminRoutes.put("/updateAdmin",authChecks,SingleuploadMiddleware,updateAdminProfile)




export default adminRoutes;