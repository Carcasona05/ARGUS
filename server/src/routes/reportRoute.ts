import express from "express";
import {
  createReport,
  getReports,
  getMyReports,
  updateReport,
  deleteReport,
  addComment,
  getComments,
  toggleLike,
  validateReport,
  getIncidentOptions,
  getAdminPosts,
} from "../controllers/reportController.ts";
import { authenticate } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/reports", authenticate, getReports);
router.get("/reports/mine", authenticate, getMyReports);
router.get("/reports/:id/comments", authenticate, getComments);
router.post("/reports/:id/comments", authenticate, addComment);
router.post("/reports/:id/like", authenticate, toggleLike);
router.post("/reports/:id/status", authenticate, validateReport);
router.post("/reports", authenticate, createReport);
router.put("/reports/:id", authenticate, updateReport);
router.delete("/reports/:id", authenticate, deleteReport);
router.get("/incidents/options", authenticate, getIncidentOptions);
router.get("/admin/posts", authenticate, getAdminPosts);

export default router;