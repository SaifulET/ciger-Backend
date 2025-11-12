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





const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Map readable category IDs
const categoryMap = {
  tobacco: "Tobacco Products",
  hookah: "Hookah",
  nicotine: "Nicotine Vapes",
  smokeless: "Smokeless Tobacco",
  thc: "THC",
  general: "General Accessories"
};

export const getCategoryPaymentsDetailedSummary = async () => {
  const records = await CategoryPayment.find().lean();

  const result = {};

  for (const record of records) {
    const { category, month, year, totalPayment = 0, totalRefund = 0 } = record;
    const monthName = monthNames[month - 1]; // Convert month number → name

    // Ensure month exists
    if (!result[monthName]) result[monthName] = {};
    // Ensure year exists
    if (!result[monthName][year]) {
      result[monthName][year] = {
        month: monthName,
        year: String(year),
        categories: [],
        total: 0,
        refund: 0
      };
    }

    // Map category to readable format
    const categoryId = Object.keys(categoryMap).find(
      key => categoryMap[key] === category
    ) || category.toLowerCase().replace(/\s+/g, "_");

    result[monthName][year].categories.push({
      id: categoryId,
      name: category,
      amount: totalPayment
    });

    result[monthName][year].total += totalPayment;
    result[monthName][year].refund += totalRefund;
  }

  // Ensure all categories appear every month/year, even if missing in DB
  const allCategories = Object.entries(categoryMap).map(([id, name]) => ({ id, name }));

  for (const monthName of Object.keys(result)) {
    for (const year of Object.keys(result[monthName])) {
      const entry = result[monthName][year];
      const existingIds = entry.categories.map(c => c.id);
      for (const cat of allCategories) {
        if (!existingIds.includes(cat.id)) {
          entry.categories.push({ ...cat, amount: 0 });
        }
      }
      // Sort categories alphabetically for consistency
      entry.categories.sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  return result;
};



// Month abbreviations
const monthAbbr = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

export const getYearlyMonthwisePaymentSummary = async () => {
  // Fetch all category payment data
  const records = await CategoryPayment.find().lean();

  // Create a map for results
  const result = {};

  // Group by year and month
  for (const record of records) {
    const { month, year, totalPayment = 0 } = record;
    const monthName = monthAbbr[month - 1];
    const yearKey = String(year);

    // Ensure year exists
    if (!result[yearKey]) result[yearKey] = [];

    // Check if month already exists
    const existing = result[yearKey].find(m => m.month === monthName);
    if (existing) {
      existing.value += totalPayment;
    } else {
      result[yearKey].push({
        month: monthName,
        value: totalPayment
      });
    }
  }

  // Ensure each year has all 12 months (fill missing with 0)
  for (const year of Object.keys(result)) {
    const existingMonths = result[year].map(m => m.month);
    monthAbbr.forEach(monthName => {
      if (!existingMonths.includes(monthName)) {
        result[year].push({ month: monthName, value: 0 });
      }
    });

    // Sort months in correct order
    result[year].sort((a, b) => monthAbbr.indexOf(a.month) - monthAbbr.indexOf(b.month));
  }

  return result;
};
