import Breakdown from "../models/breakdown.js";
import { getCurrentMonthYear } from "../utils/date.js";

export const createBreakdown = async ({ category, amount }) => {
  console.log("abc")
  const { month, year } = getCurrentMonthYear();
console.log("ab",category,amount)
  return await Breakdown.create({
    month,
    year,
    category,
    amount
  });
};





export const getFormattedBreakdowns = async () => {
  const rows = await Breakdown.find().lean();

  const result = {};

  rows.forEach(item => {
    const { month, year, category, amount } = item;

    if (!result[month]) result[month] = {};
    if (!result[month][year]) {
      result[month][year] = {
        month,
        year,
        categories: [],
        total: 0,
        refund: 0
      };
    }

    const node = result[month][year];

    if (category === "refund") {
      node.refund += amount;
      node.total -= amount;
    } else {
      const found = node.categories.find(c => c.id === category);

      if (found) {
        found.amount += amount;
      } else {
        node.categories.push({
          id: category,
          name: category,
          amount
        });
      }

      node.total += amount;
    }
  });

  return result;
};




export const getYearlyMonthlyBreakdown = async () => {
  const rows = await Breakdown.find().lean();

  // Month mapping
  const monthOrder = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const monthShort = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

  const result = {};

  // Group by year-month totals
  const grouped = {}; 
  rows.forEach(item => {
    const { year, month, category, amount } = item;

    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = { total: 0, refund: 0 };

    if (category === "refund") {
      grouped[year][month].refund += amount;
    } else {
      grouped[year][month].total += amount;
    }
  });

  // Build final formatted output
  Object.keys(grouped).forEach(year => {
    result[year] = [];

    monthOrder.forEach((m, i) => {
      const monthData = grouped[year][m] || { total: 0, refund: 0 };

      const value = monthData.total - monthData.refund;

      result[year].push({
        month: monthShort[i],
        value
      });
    });
  });

  return result;
};

