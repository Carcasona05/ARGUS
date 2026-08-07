import express from "express";
import { login, register, getProfile, updateProfile, adminLogin, adminRegister } from "../controllers/authController.ts";
import { getAccounts, updateAccount, deleteAccount, toggleStatus } from "../controllers/adminController.ts";
import { authenticate } from "../middlewares/authMiddleware.ts";
import { adapt } from "../utils/adapt.ts";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, adapt(getProfile));
router.put("/profile", authenticate, adapt(updateProfile));

router.post("/admin/login", adminLogin);
router.post("/admin/register", authenticate, adapt(adminRegister));
router.get("/admin/accounts", authenticate, adapt(getAccounts));
router.put("/admin/accounts/:id", authenticate, adapt(updateAccount));
router.delete("/admin/accounts/:id", authenticate, adapt(deleteAccount));
router.patch("/admin/accounts/:id/status", authenticate, adapt(toggleStatus));

export default router;