import Carousel from "../models/carousel.js";

// ✅ Add a new image
export const addImage = async (imageUrl) => {
   const imageDocs = imageUrl.map((url) => ({ imageUrl: url }));
  return await Carousel.insertMany(imageDocs);
};

// ✅ Get all images
export const getAllImages = async () => {
  return await Carousel.find().sort({ createdAt: -1 });
};

// ✅ Delete image by ID
export const deleteImageById = async (id) => {
  const image = await Carousel.findById(id);
  if (!image) throw new Error("Image not found");

  await Carousel.findByIdAndDelete(id);
  return { message: "Image deleted successfully" };
};
