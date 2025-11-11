import Order from "../models/order.js";
import Cart from "../models/Cart.js";

// 🧮 Helper: generate next orderId (#10000 -> #10001 -> ...)
export const generateNextOrderId = async () => {
  const lastOrder = await Order.findOne().sort({ createdAt: -1 });
  if (!lastOrder) return "#10000";

  const lastNum = parseInt(lastOrder.orderId.replace("#", "")) || 10000;
  return `#${lastNum + 1}`;
};

// ✅ Create Order
export const createOrder = async (userId, orderData) => {
  // get user's selected cart items
  const selectedCarts = await Cart.find({ userId, isSelected: true }).populate("productId");
  if (!selectedCarts.length) throw new Error("No selected cart items found");

  // generate orderId
  const orderId = await generateNextOrderId();

  // create order
  const newOrder = new Order({
    name: orderData.name,
    address: orderData.address,
    email: orderData.email,
    phone: orderData.phone,
    userId,
    orderId,
    isNextUsePayment: orderData.isNextUsePayment || false,
    carts: selectedCarts.map((c) => c._id),
  });

  await newOrder.save();

  // ✅ Delete selected cart items after order created
  await Cart.deleteMany({ userId, isSelected: true });

  // return populated order
  return await Order.findById(newOrder._id)
    .populate({
      path: "carts",
      populate: { path: "productId", model: "Product" },
    });
};

// ✅ Get all orders
export const getAllOrders = async () => {
  return await Order.find()
    .populate({
      path: "carts",
      populate: { path: "productId", model: "Product" },
    })
    .sort({ createdAt: -1 });
};

// ✅ Get order by ID
export const getOrderById = async (id) => {
  const order = await Order.findById(id).populate({
    path: "carts",
    populate: { path: "productId", model: "Product" },
  });
  if (!order) throw new Error("Order not found");
  return order;
};

// ✅ Update order (state, tracking number, etc.)
export const updateOrderById = async (id, data) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  Object.assign(order, data);
  await order.save();

  return await Order.findById(order._id)
    .populate({
      path: "carts",
      populate: { path: "productId", model: "Product" },
    });
};





// ✅ Get orders by user ID
export const getOrdersByUser = async (userId) => {
  const orders = await Order.find({ userId })
    .populate({
      path: "carts",
      populate: { path: "productId", model: "Product" },
    })
    .sort({ createdAt: -1 });

  if (!orders.length) throw new Error("No orders found for this user");

  return orders;
};
