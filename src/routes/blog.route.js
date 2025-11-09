import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../controllers/blog.controller.js";

const blogRoute = express.Router();

// Create new blog
blogRoute.post("/createBlog", createBlog);

// Get all blogs
blogRoute.get("/getAllBlogs", getAllBlogs);

// Get single blog
blogRoute.get("/getBlogById/:id", getBlogById);

// Update blog
blogRoute.put("/updateBlog/:id", updateBlog);

// Delete blog
blogRoute.delete("/deleteBlog/:id", deleteBlog);

export default blogRoute;
