import * as carouselService from "../services/carousel.service.js";

// ✅ Create (add image)
export const createImage = async (req, res) => {
  try {
   
      let imageUrls = [];
    if (req.files && req.files.length > 0) {
      imageUrls = req.files.map(file =>
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${file.key}`
      );
    }
    const image = await carouselService.addImage(imageUrls);
    res.status(201).json({ success: true, data: image });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// ✅ Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await carouselService.getAllImages();
    res.status(200).json({ success: true, data: images });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ Delete image by ID
export const deleteImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await carouselService.deleteImageById(id);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
