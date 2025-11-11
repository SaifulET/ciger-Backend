import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  getOrdersByUser
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/createOrder", createOrder);        // create new order from selected cart
orderRouter.get("/getAllOrder", getAllOrders);        // get all orders
orderRouter.get("/getOrderById/:id", getOrderById);     // get single order
orderRouter.put("/updateOrderById/:id", updateOrderById);  // update (status, tracking, etc.)

orderRouter.get("/userOrder/:userId", getOrdersByUser);  // ✅ get orders by user

export default orderRouter;
