import type { Request, Response, NextFunction } from "express";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../config/supabase.ts";
import { profileService } from "../services/authService.ts";

type AuthRequest = Request & { user?: User; token?: string };

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = header.slice(7);
  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  req.user = data.user;
  req.token = token;
  next();
};

export const requireRole = (roles: string[]) => {
  return async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    const user = req.user;

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const { data } = await profileService.getProfile(user.id);

    if (!data || !roles.includes(data.role)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
};