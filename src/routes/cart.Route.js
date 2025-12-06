import express from "express";
import {
  createCart,
  getUserCart,
  updateCart,
  clearCart,
  deleteCartById,
  UnCheckedIdController
} from "../controllers/cart.controller.js";
import {authCheck} from "../middlewares/auth.middleware.js"

const cartRoute = express.Router();

// Create or add item to cart
cartRoute.post("/createCart", createCart);

// Get all items in user's cart
cartRoute.get("/getUserCart/:userId", getUserCart);

// Update cart item (quantity or selection)
cartRoute.put("/updateCart/:id", updateCart);

// Clear all cart items for user
cartRoute.delete("/clearCart/:userId", clearCart);

// Delete cart item by ID
cartRoute.delete("/deleteCart/:id",deleteCartById);


cartRoute.post("/checkedid",UnCheckedIdController)

export default cartRoute;
