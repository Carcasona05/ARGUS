import express from "express";
import {
  getNotifications,
  getLoginActivities,
  markNotificationRead,
} from "../controllers/notificationController.ts";
import { authenticate } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/notifications", authenticate, getNotifications);
router.get("/notifications/login-activity", authenticate, getLoginActivities);
router.patch("/notifications/:id/read", authenticate, markNotificationRead);

export default router;