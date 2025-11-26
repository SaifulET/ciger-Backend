import { createBreakdown, getFormattedBreakdowns ,getYearlyMonthlyBreakdown} from "../services/breakdownService.js";

export const handleCreate = async (req, res) => {
  try {
    const data= req.body;

    const created = await createBreakdown(data);

    res.status(201).json({
      success: true,
      message: "Record added successfully",
      data: created
    });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const handleGetFormatted = async (req, res) => {
  try {
    const data = await getFormattedBreakdowns();

    res.status(200).json({ success: true, data });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};





export const handleGetYearlyBreakdown = async (req, res) => {
  try {
    const data = await getYearlyMonthlyBreakdown();

    res.status(200).json({
      success: true,
      data
    });
    
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
