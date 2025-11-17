import * as orderService from "../services/order.Service.js";

// ✅ Create order
export const createOrder = async (req, res) => {
  try {
    const userId = req.user?._id || req.body.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID required" });
    }

    const order = await orderService.createOrder(userId, req.body);

    
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// ✅ Update order by ID
export const updateOrderById = async (req, res) => {
  try {
    const order = await orderService.updateOrderById(req.params.id, req.body);
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



// ✅ Get orders by user
export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId || req.user?._id;
console.log(userId)
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await orderService.getOrdersByUser(userId);
    console.log(orders)
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    console.log(err)
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};