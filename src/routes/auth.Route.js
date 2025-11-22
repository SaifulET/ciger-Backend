import express from "express";
import { signup, signin, forgotPassword, resetPassword, signout, verifyOtpController,  } from "../controllers/auth.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";
const authRoutes = express.Router();



authRoutes.post("/signup",signup )
authRoutes.post("/signin", signin)
authRoutes.post("/forget-password",forgotPassword )
authRoutes.post("/verifyOtp",verifyOtpController )

authRoutes.post("/reset-password", resetPassword)

authRoutes.post("/signout",authCheck, signout)



authRoutes.get("/getAllUser", getAllUsers);





export default authRoutes;