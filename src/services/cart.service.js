import Cart from "../models/cart.js";

// ✅ Create or add to cart
export const createCart = async (data) => {
  const existing = await Cart.findOne({
    userId: data.userId,
    productId: data.productId,
  });

  if (existing) {
    existing.quantity += data.quantity || 1;
    return await existing.save();
  }

  const cart = new Cart(data);
  return await cart.save();
};

// ✅ Get all user cart items
export const getUserCart = async (userId) => {
  return await Cart.find({ userId })
    .populate("productId", "name price discount images isInStock BrandId")
    .sort({ createdAt: -1 });
};

// ✅ Update cart by ID (quantity, selection)
export const updateCart = async (id, data) => {
  return await Cart.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Clear entire cart for a user
export const clearCart = async (userId) => {
  const items = await Cart.find({ userId });

  if (!items || items.length === 0) {
    throw new Error("No cart items found for this user");
  }

  await Cart.deleteMany({ userId });
  return { message: "All cart items cleared successfully" };
};

// ✅ Delete single cart item
export const deleteCartById = async (id) => {
  return await Cart.findByIdAndDelete(id);
};
