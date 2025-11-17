import express from "express";
import {
  createCart,
  getUserCart,
  updateCart,
  clearCart,
  deleteCartById
} from "../controllers/cart.controller.js";
import {authCheck} from "../middlewares/auth.middleware.js"

const cartRoute = express.Router();

// Create or add item to cart
cartRoute.post("/createCart",authCheck, createCart);

// Get all items in user's cart
cartRoute.get("/getUserCart/:userId",authCheck, getUserCart);

// Update cart item (quantity or selection)
cartRoute.put("/updateCart/:id",authCheck, updateCart);

// Clear all cart items for user
cartRoute.delete("/clearCart/:userId",authCheck, clearCart);

// Delete cart item by ID
cartRoute.delete("/deleteCart/:id",authCheck, deleteCartById);

export default cartRoute;
