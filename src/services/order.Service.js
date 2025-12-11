import Order from "../models/order.js";
import Cart from "../models/cart.js";
import { createNotification } from "./notification.service.js";
import User from "../models/user.model.js";
import { createBreakdown } from "./breakdownService.js";


// 🧮 Helper: generate next orderId (#10000 -> #10001 -> ...)
export const generateNextOrderId = async () => {
  const lastOrder = await Order.findOne().sort({ createdAt: -1 });
  if (!lastOrder) return "#10000";

  const lastNum = parseInt(lastOrder.orderId.replace("#", "")) || 10000;
  return `#${lastNum + 1}`;
};

// ✅ Create Order
export const createOrder = async (userId, orderData) => {
  const {
    firstName,
    lastName,
    country,
    city,
    stateName,
    zipCode,
    apartment,
    phone,
    email,
    trackingNo,
    isNextUsePayment,
    tax,
    discount,
    shippingCost,
    transactionId
  } = orderData;

  // 1️⃣ Fetch selected carts
  const carts = await Cart.find({ userId, isSelected: true })
    .populate({
      path: "productId",
      populate: { path: "brandId", model: "Brand" }
    });

  if (!carts.length) throw new Error("No selected cart items found");

  // 2️⃣ Fetch user details (fallback)
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // 3️⃣ Build final address fields
  const finalFirst = firstName || user.firstName || "";
  const finalLast = lastName || user.lastName || "";
  const finalCountry = country || user.country || "";
  const finalCity = city || user.city || "";
  const finalState = stateName || user.stateName || "";
  const finalZip = zipCode || user.zipCode || "";
  const finalApartment = apartment || user.apartment || "";

  const fullName = `${finalFirst} ${finalLast}`.trim(); // ✅ name = firstName + lastName
  const formattedAddress = `${finalApartment ? finalApartment + ", " : ""}${finalCity}, ${finalState}, ${finalCountry} - ${finalZip}`;

  // 4️⃣ Calculate totals
  let subtotal = 0;
console.log(carts,"cartId")
  for (const c of carts) {
    if(c.productId){
      c.total = c.quantity * c.productId.price;
    c.isOrdered = true;
    await c.save();
    subtotal += c.total;
    }
    
  }

  const total =
    subtotal +
    (subtotal * tax) / 100 -
    (subtotal * discount) / 100 +
    shippingCost;

  // 5️⃣ Generate orderId
  const orderId = await generateNextOrderId();
  const cartIds = carts.map(c => c._id);




  // 6️⃣ Create order
  const newOrder = new Order({
    userId,
    name: fullName, // ✅ combined firstName + lastName
    firstName: finalFirst,
    lastName: finalLast,
    country: finalCountry,
    city: finalCity,
    stateName: finalState,
    zipCode: finalZip,
    apartment: finalApartment,

    address: formattedAddress,

    email: email || user.email,
    phone: phone || user.phone,

    trackingNo,
    isNextUsePayment,
    orderId,

    tax,
    discount,
    shippingCost,
    subtotal,
    total,

    state: "processing",
    transactionId,
    carts: cartIds
  });

  await newOrder.save();
const status="processing";
const OrderId= newOrder._id
// console.log(userId,"117")
console.log("118",newOrder,"118")
const UserId= newOrder.userId
const data= {UserId,OrderId,status}
createNotification(data);
console.log(carts,"124")

 for (const c of carts) {
    if(c.productId){
      let amount = c.quantity * c.productId.price;
      let category= c.productId.category;
      createBreakdown({category, amount});
    }
  
  }

await Cart.updateMany(
  { _id: { $in: carts.map(c => c._id) } },
  { $set: { isSelected: false } }
);


  // 8️⃣ Return populated order
  return await Order.findById(newOrder._id)
    .populate({
      path: "carts",
      populate: {
        path: "productId",
        populate: { path: "brandId", model: "Brand" }
      }
    });

    
};


// ✅ Get all orders
export const getAllOrders = async () => {
  return await Order.find()
    .sort({ createdAt: -1 })
    .populate({
      path: "carts",
      populate: {
        path: "productId",
        populate: { path: "brandId", model: "Brand" }
      }
    })
    .populate("userId", "firstName lastName email");
};

// ✅ Get order by ID
export const getOrderById = async (id) => {
  const order = await Order.findById(id)
    .populate({
      path: "carts",
      populate: {
        path: "productId",
        populate: { path: "brandId", model: "Brand" }
      }
    })
    .populate("userId", "firstName lastName email");

  if (!order) throw new Error("Order not found");
  return order;
};


// ✅ Update order (state, tracking number, etc.)
export const updateOrderById = async (id, data) => {
  console.log(data,'184')
  const allowedFields = [
    "trackingNo",
    "state",
    "tax",
    "discount",
    "shippingCost",
    "isNextUsePayment"
  ];

  const updateData = {};
  allowedFields.forEach(field => {
    if (data[field] !== undefined) updateData[field] = data[field];
  });
console.log("197",updateData)
  const order = await Order.findByIdAndUpdate(id, updateData, { new: true })
    .populate({
      path: "carts",
      populate: {
        path: "productId",
        populate: { path: "brandId", model: "Brand" }
      }
    })
    .populate("userId", "firstName lastName email");

  if (!order) throw new Error("Order not found");
  console.log(data.state,'209')
  const UserId= order.userId._id
  const OrderId=id;
  if(data.state){
    const status=data.state;
    createNotification({OrderId,UserId,status});
  }
if(data.state=="refunded") {
  console.log("210",order.total)

      let amount = order.total;
      let category= "refund";
      console.log(amount,category);
      const temp = await createBreakdown({category, amount});
   
    
  }


  return order;
};






// ✅ Get orders by user ID
export const getOrdersByUser = async (userId) => {
  return await Order.find({ userId })
    .sort({ createdAt: -1 })
    .populate({
      path: "carts",
      populate: {
        path: "productId",
        populate: { path: "brandId", model: "Brand" }
      }
    });
};
