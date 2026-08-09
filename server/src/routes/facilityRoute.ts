import express from "express";
import { getNearbyFacilities } from "../controllers/facilityController.ts";
import { authenticate } from "../middlewares/authMiddleware.ts";
import { adapt } from "../utils/adapt.ts";

const router = express.Router();

router.get("/facilities/nearby", authenticate, adapt(getNearbyFacilities));

export default router;