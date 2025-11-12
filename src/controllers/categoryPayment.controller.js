import * as categoryPaymentService from "../services/categoryPayment.service.js";

// ➕ Create or update manually
export const createOrUpdateCategoryPayment = async (req, res) => {
  try {
    const { category, payment, refund } = req.body;
    if (!category) return res.status(400).json({ success: false, message: "Category required" });

    const record = await categoryPaymentService.addOrUpdateCategoryPayment({ category, payment, refund });
    res.status(201).json({ success: true, data: record });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// 📊 Get all category payments with total
export const getAllCategoryPayments = async (req, res) => {
  try {
    const { month, year } = req.query;
    const data = await categoryPaymentService.getAllCategoryPayments(Number(month), Number(year));
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const getCategoryPaymentsMonthYearController = async (req, res) => {
  try {
    const { month, year } = req.query;

    const data = await categoryPaymentService.getCategoryPaymentsByMonthYear(Number(month), Number(year));

    res.status(200).json({
      success: true,
      month,
      year,
      records: data.records,
      totalPayment: data.totalPayment,
      totalRefund: data.totalRefund
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



export const getCategoryPaymentsDetailedSummary = async (req, res) => {
  try {
    const summary = await categoryPaymentService.getCategoryPaymentsDetailedSummary();
    res.status(200).json({ success: true, summary });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};



export const getYearlyMonthwisePaymentSummary = async (req, res) => {
  try {
    const summary = await categoryPaymentService.getYearlyMonthwisePaymentSummary();
    res.status(200).json({ success: true, data: summary });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};