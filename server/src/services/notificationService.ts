import { supabaseAdmin } from "../config/supabaseAdmin.ts";

type NotifType =
  | "report_status"
  | "nearby_incident"
  | "admin_account"
  | "report_submitted"
  | "ai_validation"
  | "report_approved"
  | "system"
  | "log";

export const notificationService = {
  async getTypeId(name: string) {
    const { data, error } = await supabaseAdmin
      .from("notification_types")
      .select("id")
      .eq("name", name)
      .maybeSingle();

    if (error) return { id: null, error: error.message };
    if (data) return { id: data.id, error: null };

    const { data: inserted, error: insertError } = await supabaseAdmin
      .from("notification_types")
      .insert({ name })
      .select("id")
      .maybeSingle();

    if (insertError) return { id: null, error: insertError.message };
    return { id: inserted?.id ?? null, error: null };
  },

  async createNotification(input: {
    userId: string;
    type: NotifType;
    title: string;
    message?: string;
    priority?: "Low" | "Medium" | "High";
    reportId?: string;
    location?: string;
    isVerified?: boolean;
    distanceMeters?: number | string;
    level?: "Low" | "Moderate" | "High";
  }) {
    const { id: typeId, error: typeError } = await this.getTypeId(input.type);
    if (typeError) return { error: typeError };

    const { data: inserted, error } = await supabaseAdmin
      .from("notifications")
      .insert({
        user_id: input.userId,
        type_id: typeId,
        title: input.title,
        message: input.message ?? "",
        priority: input.priority ?? "Low",
      })
      .select("id")
      .maybeSingle();

    if (error || !inserted) return { error: error?.message ?? "Insert failed" };

    if (input.type === "report_status") {
      const { error: childError } = await supabaseAdmin
        .from("notification_report_status")
        .insert({
          notification_id: inserted.id,
          report_id: input.reportId ?? null,
          location: input.location ?? null,
          is_verified: input.isVerified ?? false,
        });
      if (childError) return { error: childError.message };
    }

    if (input.type === "nearby_incident") {
      const { error: childError } = await supabaseAdmin
        .from("notification_nearby_incident")
        .insert({
          notification_id: inserted.id,
          report_id: input.reportId ?? null,
          distance_meters: input.distanceMeters ?? null,
          level: input.level ?? "Moderate",
        });
      if (childError) return { error: childError.message };
    }

    return { data: inserted.id };
  },

  async createLoginActivity(input: {
    userId: string;
    device: string;
    location?: string;
    isCurrent?: boolean;
  }) {
    const { error } = await supabaseAdmin.from("login_activities").insert({
      user_id: input.userId,
      device: input.device,
      location: input.location ?? null,
      is_current: input.isCurrent ?? false,
    });

    if (error) return { error: error.message };
    return { data: true };
  },

  async listUserNotifications(userId: string) {
    const { data: types, error: typesError } = await supabaseAdmin
      .from("notification_types")
      .select("id, name");

    if (typesError) return { data: null, error: typesError.message };

    const typeIdByName = new Map<string, string>();
    (types || []).forEach((t: { id: string; name: string }) =>
      typeIdByName.set(t.name, t.id)
    );

    const {
      data: notifications,
      error: nError,
    } = await supabaseAdmin
      .from("notifications")
      .select("id, type_id, title, message, priority, is_read, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (nError) return { data: null, error: nError.message };

    const baseIds = (notifications || []).map((n) => n.id);

    const { data: reportStatusRows, error: rsError } = baseIds.length
      ? await supabaseAdmin
          .from("notification_report_status")
          .select("notification_id, report_id, location, is_verified")
          .in("notification_id", baseIds)
      : { data: [], error: null };
    if (rsError) return { data: null, error: rsError.message };

    const { data: nearbyRows, error: niError } = baseIds.length
      ? await supabaseAdmin
          .from("notification_nearby_incident")
          .select("notification_id, report_id, distance_meters, level")
          .in("notification_id", baseIds)
      : { data: [], error: null };
    if (niError) return { data: null, error: niError.message };

    const childById = new Map<string, Record<string, unknown>>();
    (reportStatusRows || []).forEach((r: { notification_id: string }) =>
      childById.set(r.notification_id, r as Record<string, unknown>)
    );
    (nearbyRows || []).forEach((r: { notification_id: string }) =>
      childById.set(r.notification_id, r as Record<string, unknown>)
    );

    const reportStatuses = [];
    const nearbyIncidents = [];

    for (const n of notifications || []) {
      const typeId = String(n.type_id);
      const base = {
        id: n.id,
        title: n.title,
        message: n.message,
        time: n.created_at,
        isRead: n.is_read,
      };

      const child = childById.get(n.id);

      if (typeId === typeIdByName.get("report_status")) {
        reportStatuses.push({
          ...base,
          reportId: child?.report_id ?? null,
          location: child?.location ?? "",
          verified: child?.is_verified ?? false,
        });
      }

      if (typeId === typeIdByName.get("nearby_incident")) {
        nearbyIncidents.push({
          ...base,
          type: n.title,
          distance: child?.distance_meters
            ? `${child.distance_meters} m away`
            : "",
          level: child?.level ?? "Moderate",
        });
      }
    }

    return { data: { reportStatuses, nearbyIncidents }, error: null };
  },

  async listLoginActivities(userId: string) {
    const { data, error } = await supabaseAdmin
      .from("login_activities")
      .select("id, device, location, is_current, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return { data: null, error: error.message };

    const activities = (data || []).map((a) => ({
      id: a.id,
      device: a.device,
      location: a.location ?? "",
      time: a.created_at,
      current: a.is_current ?? false,
    }));

    return { data: activities, error: null };
  },

  async markRead(userId: string, notificationId: string) {
    const { error } = await supabaseAdmin
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId)
      .eq("user_id", userId);

    if (error) return { error: error.message };
    return { data: true };
  },
};