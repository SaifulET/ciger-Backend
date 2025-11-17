import * as cartService from "../services/cart.service.js";

// ✅ Create cart
export const createCart = async (req, res) => {
  try {
    // console.log(typeof  JSON.parse(req.body),"kdkdkd");
    const cart = await cartService.createCart(req.body);
    res.status(201).json({ success: true, data: cart });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Get all user cart items
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const cart = await cartService.getUserCart(userId);
    res.status(200).json({ success: true, count: cart.length, data: cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Update cart item (quantity or selection)
export const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await cartService.updateCart(id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Clear all cart items for a user
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await cartService.clearCart(userId);
    res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    if (err.message === "No cart items found for this user") {
      return res.status(404).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete cart item by ID
export const deleteCartById = async (req, res) => {
  try {
    const deleted = await cartService.deleteCartById(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Cart item not found" });
    res.status(200).json({ success: true, message: "Cart item deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
