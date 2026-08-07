import type { Response } from "express";
import { notificationService } from "../services/notificationService.ts";

type AuthRequest = import("express").Request & {
  user?: { id: string };
  token?: string;
};

export const getNotifications = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { data, error } = await notificationService.listUserNotifications(
    user.id
  );

  if (error) return res.status(500).json({ error });

  res.json({ ...data });
};

export const getLoginActivities = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { data, error } = await notificationService.listLoginActivities(
    user.id
  );

  if (error) return res.status(500).json({ error });

  res.json({ activities: data });
};

export const markNotificationRead = async (
  req: AuthRequest,
  res: Response
) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Notification id required" });

  const { error } = await notificationService.markRead(user.id, String(id));

  if (error) return res.status(500).json({ error });

  res.json({ message: "Notification marked as read" });
};