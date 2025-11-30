import { mailService } from "../services/mail.service.js";

export const mailController = async (req, res) => {
  try {
    console.log(req.body)
    const data = req.body;
    const response = await mailService(data);

    // If mailService returns an error object
    if (response.err) {
      return res.status(500).json(response);
    }

    // Success
    res.json(response);
  } catch (error) {
    console.error("Mail Controller Error:", error);
    res.status(500).json({ err: "Failed to send message." });
  }
};
