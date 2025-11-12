import express from "express";
import { signup, signin, forgotPassword, resetPassword, signout, verifyOtpController,  } from "../controllers/admin.controller.js";
import { authChecks } from "../middlewares/authForAdmin.middleware.js";
const adminRoutes = express.Router();



adminRoutes.post("/signup",signup )
adminRoutes.post("/signin", signin)
adminRoutes.post("/forget-password",forgotPassword )
adminRoutes.post("/verifyOtp",verifyOtpController )

adminRoutes.post("/reset-password", resetPassword)

adminRoutes.post("/signout",authChecks, signout)





export default adminRoutes;