import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String  },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Blog", blogSchema);
