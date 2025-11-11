import CategoryPayment from "../models/categoryPayment.js";
import Order from "../models/order.js";


/**
 * Add or update category payment/refund
 */
export const addOrUpdateCategoryPayment = async ({ category, payment = 0, refund = 0 }) => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let record = await CategoryPayment.findOne({ category, month, year });
  if (record) {
    record.totalPayment += payment;
    record.totalRefund += refund;
    await record.save();
  } else {
    record = await CategoryPayment.create({
      category,
      totalPayment: payment,
      totalRefund: refund,
      month,
      year,
    });
  }
  return record;
};

/**
 * Get all category payments (optionally filter by month/year)
 */
export const getAllCategoryPayments = async (month, year) => {
  const filter = {};
  if (month) filter.month = month;
  if (year) filter.year = year;

  const records = await CategoryPayment.find(filter);

  // calculate total across categories
  const totalPayment = records.reduce((acc, r) => acc + r.totalPayment, 0);
  const totalRefund = records.reduce((acc, r) => acc + r.totalRefund, 0);

  return { records, totalPayment, totalRefund };
};

/**
 * Calculate month/year-wise category payments from Orders
 */
export const getCategoryPaymentsByMonthYear = async (month, year) => {
  if (!month || !year) throw new Error("Month and year are required");

  const records = await CategoryPayment.find({ month, year }).lean();

  // compute total payment and refund
  const totalPayment = records.reduce((acc, r) => acc + r.totalPayment, 0);
  const totalRefund = records.reduce((acc, r) => acc + r.totalRefund, 0);

  return { records, totalPayment, totalRefund };
};
