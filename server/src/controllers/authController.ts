import type { Request, Response } from "express";
import { supabase } from "../config/supabase.ts";
import { supabaseAdmin } from "../config/supabaseAdmin.ts";
import type { User } from "@supabase/supabase-js";
import { profileService } from "../services/authService.ts";

type AuthRequest = Request & { user?: User; token?: string };

export const register = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { userName },
    });

    if (error) return res.status(400).json({ error: error.message });

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) return res.status(401).json({ error: authError.message });

    res.json({
      message: "Registered",
      access_token: authData.session?.access_token ?? null,
      user: authData.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(401).json({ error: error.message });

    res.json({
      message: "Login successful",
      access_token: data.session?.access_token ?? null,
      user: data.user,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(401).json({ error: error.message });

    const token = data.session?.access_token;
    if (!token) return res.status(401).json({ error: "No session token" });

    const { data: profile, error: profileErr } = await profileService.getProfile(data.user.id);

    if (profileErr) {
      return res.status(500).json({ error: "Profile query failed", detail: profileErr.message });
    }

    if (!profile) {
      return res.status(403).json({ error: "No profile found for this account. Contact super admin." });
    }

    if (profile.role === "user") {
      return res.status(403).json({ error: "Admin access only. Your role is set to 'user'." });
    }

    res.json({
      message: "Admin login successful",
      access_token: token,
      user: { ...data.user, name: profile.name, role: profile.role },
    });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const adminRegister = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const user = req.user;
    if (!user || !req.token) return res.status(401).json({ error: "Unauthorized" });

    const { data: profile } = await profileService.getProfile(user.id);
    if (!profile || profile.role !== "super_admin") {
      return res.status(403).json({ error: "Only super admin can create admins" });
    }

    const { email, password, name, role, department, phone } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Email, password, and name are required" });
    }

    const result = await profileService.createAdmin(email, password, name, role, department, phone);
    if (result.error) return res.status(400).json({ error: result.error.message });

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response
) => {
  const user = req.user;
  if (!user || !req.token) return res.status(401).json({ error: "Unauthorized" });

  const { data } = await profileService.getProfile(user.id);

  const meta = user.user_metadata ?? {};
  const fallbackName = meta.userName ?? meta.name ?? user.email ?? "";

  res.json({
    name: data?.name ?? fallbackName,
    user_name: data?.user_name ?? fallbackName,
    first_name: data?.first_name ?? meta.firstName ?? "",
    last_name: data?.last_name ?? meta.lastName ?? "",
    phone: data?.phone ?? meta.phone ?? "",
    role: data?.role ?? "user",
    email: user.email,
  });
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response
) => {
  const user = req.user;
  if (!user || !req.token) return res.status(401).json({ error: "Unauthorized" });

  await profileService.ensureProfile(user.id);

  const { first_name, last_name, user_name, phone } = req.body ?? {};

  const updates: Record<string, unknown> = {};
  if (first_name !== undefined) updates.first_name = first_name;
  if (last_name !== undefined) updates.last_name = last_name;
  if (user_name !== undefined) updates.user_name = user_name;
  if (phone !== undefined) updates.phone = phone;

  const { data, error } = await profileService.updateProfileFields(
    user.id,
    updates
  );

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: "Profile updated successfully", data });
};