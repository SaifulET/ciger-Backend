import * as userService from "../services/User.Service.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.headers.user_id // from auth middleware or param
    const user = await userService.getUserProfile(userId);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.headers.user_id ;
    console.log(userId)
    const data= req.body
     if (req.file) {
  data.image = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${req.file.key}`;
}
    const updatedUser = await userService.updateUserProfile(userId, data);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};




export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersService();

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Server error"
    });
  }
};