import Cart from "../models/cart.js";

// ✅ Create or add to cart
export const createCart = async (data) => {
  console.log(data,"hellow")
  const existing = await Cart.findOne({
    userId: data.userId,
    productId: data.productId,
    isSelected:true,
  });
console.log(existing)
  if (existing) {
    existing.quantity += data.quantity || 1;
    return await existing.save();
  }

  const cart = new Cart(data);
  console.log(cart,"abc")
  return await cart.save();
};

// ✅ Get all user cart items
export const getUserCart = async (userId) => {
  return await Cart.find({ 
      userId,
      isSelected: true
    })
    .populate({
      path: "productId",
      select: "name price discount images isInStock brandId",
      populate: {
        path: "brandId",
        select: "name image",
      },
    })
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




export const unCheckCartService = async (cartIds, userId) => {
  try {
    // 1️⃣ Fetch selected & not-ordered cart items of this user
    const selectedCarts = await Cart.find({
      userId,
      isSelected: true,
      isOrdered: false,
    });

    // 2️⃣ Update all carts of this user WHERE ID is NOT in the cartIds array
    await Cart.updateMany(
      {
        userId,
        _id: { $nin: cartIds },   // carts NOT in cartIds
      },
      {
        $set: { isSelected :false },
      }
    );

    return { selectedCarts };
  } catch (err) {
    console.log(err);
    throw err;
  }
};