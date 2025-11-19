import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  feature:{type:Boolean,default:false},
}, { timestamps: true });

export default mongoose.model("Brand", brandSchema);
