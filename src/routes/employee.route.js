import express from "express";
import { allEmployeeController, employeeSignupController, setEmployeePasswordController, updateEmployeeApprovalController, verifyEmployeeOtpController } from "../controllers/employee.controller.js";

const employeeRoutes = express.Router();

employeeRoutes.post("/signup",employeeSignupController )
employeeRoutes.post("/verifyOtp",verifyEmployeeOtpController)
employeeRoutes.post("/setPassword",setEmployeePasswordController)
employeeRoutes.get("/allEmployee",allEmployeeController)
employeeRoutes.post("/updateApproval/:employeeId",updateEmployeeApprovalController)




export default employeeRoutes;