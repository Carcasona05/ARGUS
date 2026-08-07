import { supabaseAdmin } from "../config/supabaseAdmin.ts";

type ReportInput = {
  location?: string;
  latitude?: string | number;
  longitude?: string | number;
  details?: string;
  poster_name?: string;
  display_name_type?: "Fullname" | "Username";
  incident_category?: string;
  incident_type?: string;
  photos?: string[];
  status?: string;
  is_verified?: boolean;
};

const VALID_STATUSES = [
  "Pending Review",
  "Under Verification",
  "Resolved",
  "Rejected",
  "Archived",
];

async function resolveIncidentType(
  categoryName: string,
  typeName: string
): Promise<{ id: string | null; error: string | null }> {
  let { data: category } = await supabaseAdmin
    .from("incident_categories")
    .select("id")
    .eq("name", categoryName)
    .maybeSingle();

  if (!category) {
    const { data: inserted, error } = await supabaseAdmin
      .from("incident_categories")
      .insert({ name: categoryName })
      .select("id")
      .maybeSingle();

    if (error) return { id: null, error: error.message };
    if (!inserted) return { id: null, error: "Failed to create category" };
    category = inserted;
  }

  const { data: typeData, error: typeError } = await supabaseAdmin
    .from("incident_types")
    .select("id")
    .eq("category_id", category.id)
    .eq("name", typeName)
    .maybeSingle();

  if (typeError) return { id: null, error: typeError.message };
  if (typeData) return { id: typeData.id, error: null };

  const { data: insertedType, error: insertTypeError } = await supabaseAdmin
    .from("incident_types")
    .insert({ category_id: category.id, name: typeName })
    .select("id")
    .maybeSingle();

  if (insertTypeError) return { id: null, error: insertTypeError.message };
  if (!insertedType) return { id: null, error: "Failed to create incident type" };

  return { id: insertedType.id, error: null };
}

export const reportService = {
  async createReport(userId: string, input: ReportInput) {
    const category = (input.incident_category || "").trim();
    const type = (input.incident_type || "").trim();

    if (!category || !type) {
      return { error: "Incident category and type are required" };
    }

    const { id: incidentTypeId, error: resolveError } = await resolveIncidentType(
      category,
      type
    );

    if (resolveError) return { error: resolveError };

    const status = VALID_STATUSES.includes(input.status || "")
      ? input.status!
      : "Pending Review";

    const { data: report, error } = await supabaseAdmin
      .from("reports")
      .insert({
        user_id: userId,
        incident_type_id: incidentTypeId,
        location: input.location ?? "",
        latitude: input.latitude ? Number(input.latitude) : null,
        longitude: input.longitude ? Number(input.longitude) : null,
        poster_name: input.poster_name ?? "",
        display_name_type: input.display_name_type ?? "Fullname",
        details: (input.details || "").trim(),
        status,
        is_verified: input.is_verified ?? false,
      })
      .select("id")
      .maybeSingle();

    if (error) return { error: error.message };
    if (!report) return { error: "Failed to create report" };

    const images = Array.isArray(input.photos)
      ? input.photos.map((url, index) => ({
          report_id: report.id,
          image_url: url,
          position: index,
        }))
      : [];

    if (images.length > 0) {
      const { error: imageError } = await supabaseAdmin
        .from("report_images")
        .insert(images);
      if (imageError) return { error: imageError.message };
    }

    return { data: report.id };
  },

  async listReports(viewerId?: string) {
    const { data: types, error: typesError } = await supabaseAdmin
      .from("incident_types")
      .select("id, name, incident_categories(id, name)");

    if (typesError) return { data: null, error: typesError.message };

    const typeMap = new Map<string, { type: string; category: string }>();
    (types || []).forEach((row) => {
      const t = row as unknown as {
        id: string;
        name: string;
        incident_categories: { name: string }[] | null;
      };
      typeMap.set(t.id, {
        type: t.name,
        category: t.incident_categories?.[0]?.name ?? "",
      });
    });

    const { data: reports, error: reportError } = await supabaseAdmin
      .from("reports")
      .select(
        "id, user_id, location, latitude, longitude, details, poster_name, display_name_type, status, is_verified, created_at, incident_type_id"
      )
      .order("created_at", { ascending: false });

    if (reportError) return { data: null, error: reportError.message };

    const reportIds = (reports || []).map((r) => r.id);

    const { data: images, error: imageError } = reportIds.length
      ? await supabaseAdmin
          .from("report_images")
          .select("report_id, image_url")
          .in("report_id", reportIds)
          .order("position", { ascending: true })
      : { data: [], error: null };

    if (imageError) return { data: null, error: imageError.message };

    const imagesByReport = new Map<string, string[]>();
    (images || []).forEach((img: { report_id: string; image_url: string }) => {
      const list = imagesByReport.get(img.report_id) || [];
      list.push(img.image_url);
      imagesByReport.set(img.report_id, list);
    });

    const likesByReport = new Map<string, number>();
    const likedByUser = new Set<string>();
    if (reportIds.length > 0) {
      const { data: likes, error: likeError } = await supabaseAdmin
        .from("report_likes")
        .select("report_id, user_id")
        .in("report_id", reportIds);
      if (likeError) return { data: null, error: likeError.message };

      (likes || []).forEach(
        (l: { report_id: string; user_id: string | null }) => {
          likesByReport.set(l.report_id, (likesByReport.get(l.report_id) || 0) + 1);
          if (l.user_id) likedByUser.add(`${l.report_id}:${l.user_id}`);
        }
      );
    }

    const commentsByReport = new Map<string, number>();
    if (reportIds.length > 0) {
      const { data: commentRows, error: commentError } = await supabaseAdmin
        .from("report_comments")
        .select("report_id")
        .in("report_id", reportIds);
      if (commentError) return { data: null, error: commentError.message };

      (commentRows || []).forEach((c: { report_id: string }) => {
        commentsByReport.set(c.report_id, (commentsByReport.get(c.report_id) || 0) + 1);
      });
    }

    const enriched = (reports || []).map((r) => {
      const typeInfo = typeMap.get(r.incident_type_id) || {
        type: "",
        category: "",
      };
      return {
        id: r.id,
        user_id: r.user_id,
        location: r.location ?? "",
        details: r.details ?? "",
        poster_name: r.poster_name ?? "",
        status: r.status ?? "Pending Review",
        is_verified: r.is_verified ?? false,
        created_at: r.created_at,
        incident_category: typeInfo.category,
        incident_type: typeInfo.type,
        images: imagesByReport.get(r.id) || [],
        likes: likesByReport.get(r.id) || 0,
        comments: commentsByReport.get(r.id) || 0,
        is_liked: viewerId ? likedByUser.has(`${r.id}:${viewerId}`) : false,
      };
    });

    const userIds = enriched
      .map((r) => r.user_id)
      .filter((id): id is string => !!id);

    const nameByUser = new Map<string, string>();
    if (userIds.length > 0) {
      const { data: profiles, error: profileError } = await supabaseAdmin
        .from("profiles")
        .select("id, fullname, user_name")
        .in("id", userIds);

      if (!profileError) {
        (profiles || []).forEach(
          (p: { id: string; fullname: string | null; user_name: string | null }) => {
            nameByUser.set(p.id, p.fullname || p.user_name || "");
          }
        );
      }
    }

    const final = enriched.map((r) => ({
      ...r,
      poster_name: r.poster_name || nameByUser.get(r.user_id) || "Anonymous User",
    }));

    return { data: final, error: null };
  },

  async listMyReports(userId: string) {
    const all = await this.listReports(userId);
    if (all.error) return all;

    const filtered = (all.data || []).filter((r) => r.user_id === userId);

    return { data: filtered, error: null };
  },

  async updateReport(userId: string, reportId: string, input: ReportInput) {
    const { data: own } = await supabaseAdmin
      .from("reports")
      .select("id")
      .eq("id", reportId)
      .eq("user_id", userId)
      .maybeSingle();

    if (!own) return { error: "Report not found" };

    const updates: Record<string, unknown> = {};
    if (input.details !== undefined) updates.details = (input.details || "").trim();
    if (input.location !== undefined) updates.location = input.location;
    if (input.poster_name !== undefined) updates.poster_name = input.poster_name;

    const category = (input.incident_category || "").trim();
    const type = (input.incident_type || "").trim();

    if (category && type) {
      const { id: incidentTypeId, error: resolveError } = await resolveIncidentType(
        category,
        type
      );
      if (resolveError) return { error: resolveError };
      updates.incident_type_id = incidentTypeId;
    }

    const { error: updateError } = await supabaseAdmin
      .from("reports")
      .update(updates)
      .eq("id", reportId)
      .eq("user_id", userId);

    if (updateError) return { error: updateError.message };

    if (Array.isArray(input.photos)) {
      const { error: delError } = await supabaseAdmin
        .from("report_images")
        .delete()
        .eq("report_id", reportId);
      if (delError) return { error: delError.message };

      if (input.photos.length > 0) {
        const images = input.photos.map((url, index) => ({
          report_id: reportId,
          image_url: url,
          position: index,
        }));
        const { error: imgError } = await supabaseAdmin
          .from("report_images")
          .insert(images);
        if (imgError) return { error: imgError.message };
      }
    }

    return { data: reportId };
  },

  async deleteReport(userId: string, reportId: string) {
    const { data: own, error: checkError } = await supabaseAdmin
      .from("reports")
      .select("id")
      .eq("id", reportId)
      .eq("user_id", userId)
      .maybeSingle();

    if (checkError) return { error: checkError.message };
    if (!own) return { error: "Report not found" };

    const { error } = await supabaseAdmin
      .from("reports")
      .delete()
      .eq("id", reportId)
      .eq("user_id", userId);

    if (error) return { error: error.message };

    return { data: reportId };
  },

  async addComment(userId: string, reportId: string, content: string) {
    const text = (content || "").trim();
    if (!text) return { error: "Comment is required" };

    const { error } = await supabaseAdmin.from("report_comments").insert({
      report_id: reportId,
      user_id: userId,
      content: text,
    });

    if (error) return { error: error.message };
    return { data: true };
  },

  async listComments(reportId: string) {
    const { data, error } = await supabaseAdmin
      .from("report_comments")
      .select("id, user_id, content, created_at")
      .eq("report_id", reportId)
      .order("created_at", { ascending: true });

    if (error) return { data: null, error: error.message };

    const userIds = [...new Set((data || []).map((c) => c.user_id).filter(Boolean))];

    const nameByUser = new Map<string, string>();
    if (userIds.length > 0) {
      const { data: profiles } = await supabaseAdmin
        .from("profiles")
        .select("id, fullname, user_name")
        .in("id", userIds);
      (profiles || []).forEach(
        (p: { id: string; fullname: string | null; user_name: string | null }) =>
          nameByUser.set(p.id, p.fullname || p.user_name || "User")
      );
    }

    const comments = (data || []).map((c) => ({
      id: c.id,
      user: nameByUser.get(c.user_id) || "User",
      text: c.content,
      datePosted: c.created_at,
    }));

    return { data: comments, error: null };
  },

  async toggleLike(userId: string, reportId: string) {
    const { data: existing, error: checkError } = await supabaseAdmin
      .from("report_likes")
      .select("report_id")
      .eq("report_id", reportId)
      .eq("user_id", userId)
      .maybeSingle();

    if (checkError) return { error: checkError.message, liked: false };

    if (existing) {
      const { error } = await supabaseAdmin
        .from("report_likes")
        .delete()
        .eq("report_id", reportId)
        .eq("user_id", userId);
      if (error) return { error: error.message, liked: false };
      return { data: { liked: false }, error: null };
    }

    const { error } = await supabaseAdmin.from("report_likes").insert({
      report_id: reportId,
      user_id: userId,
    });
    if (error) return { error: error.message, liked: false };
    return { data: { liked: true }, error: null };
  },

  async countLikes(reportId: string) {
    const { data, error } = await supabaseAdmin
      .from("report_likes")
      .select("report_id")
      .eq("report_id", reportId);

    if (error) return { data: 0, error: error.message };
    return { data: (data || []).length, error: null };
  },

  async listIncidentOptions() {
    const { data: categories, error: categoryError } = await supabaseAdmin
      .from("incident_categories")
      .select("id, name")
      .order("name", { ascending: true });

    if (categoryError) return { data: null, error: categoryError.message };

    const categoryIds = (categories || []).map((c) => c.id);

    const { data: types, error: typeError } = categoryIds.length
      ? await supabaseAdmin
          .from("incident_types")
          .select("category_id, name")
          .in("category_id", categoryIds)
          .order("name", { ascending: true })
      : { data: [], error: null };

    if (typeError) return { data: null, error: typeError.message };

    const typesByCategory = new Map<string, string[]>();
    (types || []).forEach((t: { category_id: string; name: string }) => {
      const list = typesByCategory.get(t.category_id) || [];
      list.push(t.name);
      typesByCategory.set(t.category_id, list);
    });

    const options = (categories || []).map((c) => ({
      category: c.name,
      types: typesByCategory.get(c.id) || [],
    }));

    return { data: options, error: null };
  },

  async listAdminPosts() {
    const { data, error } = await supabaseAdmin
      .from("admin_posts")
      .select("id, admin_id, type, location, details, pic_url, created_at")
      .order("created_at", { ascending: false });

    if (error) return { data: null, error: error.message };

    const enriched = (data || []).map((p) => ({
      id: p.id,
      adminName: "ARGUS Admin",
      type: p.type,
      location: p.location ?? "",
      details: p.details ?? "",
      datePosted: p.created_at,
      pic: p.pic_url ?? null,
    }));

    return { data: enriched, error: null };
  },

  async validateReport(reportId: string, input: {
    status?: string;
    is_verified?: boolean;
  }) {
    const { data: report, error: findError } = await supabaseAdmin
      .from("reports")
      .select("id, user_id, location, status, is_verified, incident_type_id")
      .eq("id", reportId)
      .maybeSingle();

    if (findError) return { error: findError.message };
    if (!report) return { error: "Report not found" };

    const updates: Record<string, unknown> = {};
    if (input.status !== undefined) updates.status = input.status;
    if (input.is_verified !== undefined) updates.is_verified = input.is_verified;

    const { error: updateError } = await supabaseAdmin
      .from("reports")
      .update(updates)
      .eq("id", reportId);

    if (updateError) return { error: updateError.message };

    return {
      data: {
        id: report.id,
        ownerId: report.user_id,
        location: report.location ?? "",
        previousStatus: report.status,
        previousVerified: report.is_verified ?? false,
      },
      error: null,
    };
  },
};