import type { Response } from "express";
import { reportService } from "../services/reportService.ts";
import { profileService } from "../services/authService.ts";
import { notificationService } from "../services/notificationService.ts";
import { credibilityService } from "../services/credibilityService.ts";

type AuthRequest = import("express").Request & { user?: { id: string }; token?: string };

export const validateReport = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { data: profile } = await profileService.getProfile(user.id);
  if (!profile || !["admin", "super_admin"].includes(profile.role)) {
    return res.status(403).json({ error: "Admin access only" });
  }

  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Report id required" });

  const { status, is_verified } = req.body ?? {};

  const result = await reportService.validateReport(String(id), {
    status,
    is_verified,
  });

  if (result.error) return res.status(400).json({ error: result.error });

  if (result.data?.ownerId) {
    const prev = result.data;
    const newStatus = status ?? prev.previousStatus ?? "Pending Review";
    const verified = is_verified ?? prev.previousVerified ?? false;

    if (newStatus === "Rejected") {
      await credibilityService
        .addPoints(
          result.data.ownerId,
          "report_rejected",
          "Report rejected after review",
          result.data.id
        )
        .catch(() => {});
    }

    await notificationService.createNotification({
      userId: result.data.ownerId,
      type: "report_status",
      title: verified ? "Your report was verified" : `Your report is now "${newStatus}"`,
      message: verified
        ? "Your report has been reviewed and marked as VERIFIED by the admin."
        : `The admin updated your report. Current status: "${newStatus}".`,
      reportId: result.data.id,
      location: result.data.location,
      isVerified: verified,
    });

    if (verified || newStatus === "Resolved") {
      const { data: coords } = await reportService.getReportCoords(
        result.data.id
      );

      await notificationService
        .notifyNearbyUsers({
          reportId: result.data.id,
          latitude: coords?.latitude ?? null,
          longitude: coords?.longitude ?? null,
          title: verified
            ? "Verified incident near you"
            : "Resolved incident near you",
          message: `An incident report near you was ${
            verified ? "verified" : "resolved"
          } by the admin.`,
          level: "High",
          excludeUserId: result.data.ownerId,
        })
        .catch(() => {});
    }
  }

  res.json({
    message: "Report validated",
    status,
    is_verified: is_verified ?? false,
  });
};

export const createReport = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const result = await reportService.createReport(user.id, req.body ?? {});

  if (result.error) return res.status(400).json({ error: result.error });

  await credibilityService
    .addPoints(
      user.id,
      "report_submitted",
      "Report submitted",
      result.data ?? null
    )
    .catch(() => {});

  const latNum = req.body?.latitude ? Number(req.body.latitude) : null;
  const lngNum = req.body?.longitude ? Number(req.body.longitude) : null;

  await notificationService
    .notifyNearbyUsers({
      reportId: result.data ?? "",
      latitude: latNum,
      longitude: lngNum,
      title: req.body?.incident_type || "Incident report near you",
      message: `A new "${req.body?.incident_type || "incident"}" report was filed near your location.`,
      level: "Moderate",
      excludeUserId: user.id,
    })
    .catch(() => {});

  res.status(201).json({
    message: "Report submitted successfully",
    report_id: result.data,
  });
};

export const getReports = async (req: AuthRequest, res: Response) => {
  try {
    const { data, error } = await reportService.listReports(req.user?.id);

    if (error) return res.status(500).json({ error });

    res.json({ reports: data });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMyReports = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { data, error } = await reportService.listMyReports(user.id);

  if (error) return res.status(500).json({ error });

  res.json({ reports: data });
};

export const updateReport = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Report id required" });

  const result = await reportService.updateReport(user.id, String(id), req.body ?? {});

  if (result.error) return res.status(400).json({ error: result.error });

  res.json({ message: "Report updated successfully", report_id: result.data });
};

export const deleteReport = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "Report id required" });

  const result = await reportService.deleteReport(user.id, String(id));

  if (result.error) return res.status(400).json({ error: result.error });

  res.json({ message: "Report deleted successfully" });
};

export const addComment = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;
  const { content } = req.body ?? {};

  const result = await reportService.addComment(user.id, String(id), content);

  if (result.error) return res.status(400).json({ error: result.error });

  res.status(201).json({ message: "Comment added" });
};

export const getComments = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const { data, error } = await reportService.listComments(String(id));

  if (error) return res.status(500).json({ error });

  res.json({ comments: data });
};

export const toggleLike = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { id } = req.params;

  const result = await reportService.toggleLike(user.id, String(id));

  if (result.error) return res.status(400).json({ error: result.error });

  res.json({ liked: result.data?.liked });
};

export const getIncidentOptions = async (req: AuthRequest, res: Response) => {
  const { data, error } = await reportService.listIncidentOptions();

  if (error) return res.status(500).json({ error });

  res.json({ categories: data });
};

export const getAdminPosts = async (req: AuthRequest, res: Response) => {
  const { data, error } = await reportService.listAdminPosts();

  if (error) return res.status(500).json({ error });

  res.json({ posts: data });
};

export const getAdminDashboard = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { data: profile } = await profileService.getProfile(user.id);
  if (!profile || !["admin", "super_admin"].includes(profile.role)) {
    return res.status(403).json({ error: "Admin access only" });
  }

  const { data, error } = await reportService.getAdminDashboard();

  if (error) return res.status(500).json({ error });
  if (!data) return res.status(500).json({ error: "No dashboard data" });

  res.json({ summary: data.summary, reports: data.reports });
};

export const getAdminLogs = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { data: profile } = await profileService.getProfile(user.id);
  if (!profile || !["admin", "super_admin"].includes(profile.role)) {
    return res.status(403).json({ error: "Admin access only" });
  }

  const { data, error } = await reportService.listAuditLogs();

  if (error) return res.status(500).json({ error });
  if (!data) return res.status(500).json({ error: "No log data" });

  res.json({ logs: data });
};

export const createAdminAnnouncement = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { data: profile } = await profileService.getProfile(user.id);
  if (!profile || !["admin", "super_admin"].includes(profile.role)) {
    return res.status(403).json({ error: "Admin access only" });
  }

  const { type, location, details, pic_url } = req.body ?? {};

  const result = await reportService.createAnnouncement(user.id, {
    type,
    location,
    details,
    pic_url,
  });

  if (result.error) return res.status(400).json({ error: result.error });

  res.status(201).json({ message: "Announcement published", announcement_id: result.data });
};

export const getAdminAnalytics = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  if (!user?.id) return res.status(401).json({ error: "Unauthorized" });

  const { data: profile } = await profileService.getProfile(user.id);
  if (!profile || !["admin", "super_admin"].includes(profile.role)) {
    return res.status(403).json({ error: "Admin access only" });
  }

  const { data, error } = await reportService.getAdminAnalytics();

  if (error) return res.status(500).json({ error });
  if (!data) return res.status(500).json({ error: "No analytics data" });

  res.json({
    summary: data.summary,
    sentimentTrend: data.sentimentTrend,
    forecast: data.forecast,
    forecastSummary: data.forecastSummary,
  });
};