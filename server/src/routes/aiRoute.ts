import express from "express";
import {
  getAIStatus,
  analyzeReport,
  batchAnalyzeReports,
  toggleAI,
} from "../controllers/aiController.ts";
import { authenticate } from "../middlewares/authMiddleware.ts";

const router = express.Router();

router.get("/ai/status", authenticate, getAIStatus);
router.post("/ai/analyze/:id", authenticate, analyzeReport);
router.post("/ai/batch-analyze", authenticate, batchAnalyzeReports);
router.put("/ai/toggle", authenticate, toggleAI);

export default router;