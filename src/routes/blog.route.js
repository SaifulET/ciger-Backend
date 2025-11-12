import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../controllers/blog.controller.js";
import { SingleuploadMiddleware } from "../middlewares/awsUpload.middleware.js";

const blogRoute = express.Router();

// Create new blog
blogRoute.post("/createBlog",SingleuploadMiddleware, createBlog);

// Get all blogs
blogRoute.get("/getAllBlogs", getAllBlogs);

// Get single blog
blogRoute.get("/getBlogById/:id", getBlogById);

// Update blog
blogRoute.put("/updateBlog/:id",SingleuploadMiddleware, updateBlog);

// Delete blog
blogRoute.delete("/deleteBlog/:id", deleteBlog);

export default blogRoute;
