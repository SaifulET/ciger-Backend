import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  firstName: { type: String},
  lastName: { type: String },
  suffix: { type: String },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  image: { type: String },
  country: { type: String },
  city: { type: String },
  address: { type: String },
  postal: { type: String },
  houseNo: { type: String },
  password: { type: String, required: true },
  isSignin: { type: Boolean, default: false },
  otp: { type: String },
  otpExpires: { type: Date },

}, { timestamps: true });


export default mongoose.model("User", userSchema);
