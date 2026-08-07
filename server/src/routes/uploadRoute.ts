import express from "express";
import { uploadImage } from "../controllers/uploadController.ts";
import { authenticate } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.post("/upload/image", authenticate, uploadImage);

export default router;