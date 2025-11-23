import express from "express";
import { getUserProfile, getUserProfileByIdController, updateUserProfile } from "../controllers/user.controller.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import { SingleuploadMiddleware } from "../middlewares/awsUpload.middleware.js";


const ProfileRoute = express.Router();

// GET user info
ProfileRoute.get("/profile",authCheck, getUserProfile);
ProfileRoute.get("/profile/:userId", getUserProfileByIdController);

// PUT update user info
ProfileRoute.put("/profile",authCheck,SingleuploadMiddleware,  updateUserProfile);




export default ProfileRoute;
