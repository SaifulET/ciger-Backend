import { calculateTaxService } from "../services/tax.service.js";

export const calculateTaxController = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
console.log("tax controller called",req.body);
  const { amount,  to_zip, to_state, shipping,to_country , to_city,to_street} = req.body;
let from_zip=60203 ;
  if (!amount || !from_zip || !to_zip || !to_state) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const taxData = await calculateTaxService({
      amount,
      to_country,
      to_city,
      to_zip,
      to_state,
      shipping,
      to_street
    });

    return res.status(200).json(taxData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Tax calculation failed",
      error: err.message,
    });
  }
};
