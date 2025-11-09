import Blog from "../models/Blog.js";

// ✅ Create new blog
export const createBlog = async (data) => {
  const blog = new Blog(data);
  return await blog.save();
};

// ✅ Get all blogs
export const getAllBlogs = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

// ✅ Get blog by ID
export const getBlogById = async (id) => {
  return await Blog.findById(id);
};

// ✅ Update blog
export const updateBlog = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Delete blog
export const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};
