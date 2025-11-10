import express from "express";
import {
  createImage,
  getAllImages,
  deleteImageById
} from "../controllers/carousel.controller.js";
import { uploadMiddleware } from "../middlewares/awsUpload.middleware.js";

const carouselRouter = express.Router();

carouselRouter.post("/createImage",uploadMiddleware.array("images", 10), createImage);      // add new image
carouselRouter.get("/getAllImages", getAllImages);      // get all images
carouselRouter.delete("/deleteImage/:id", deleteImageById); // delete image by id

export default carouselRouter;
