import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.ts";
import { authenticate } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/admin/settings", authenticate, getSettings);
router.put("/admin/settings", authenticate, updateSettings);

export default router;