import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireAdmin } from "@/lib/admin-middleware";
import { emailFromClaims, isAdminEmail } from "@/lib/admin.server";

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const claims = (context as { claims?: Record<string, unknown> }).claims;
    return { isAdmin: isAdminEmail(emailFromClaims(claims)) };
  });

export const adminGetModerationQueue = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .handler(async () => {
    const [storiesRes, commentsRes, legendsRes, profilesRes] = await Promise.all([
      (supabaseAdmin as any)
        .from("stories")
        .select("id, title, body, category, created_at, school_id, author_id, schools(name)")
        .order("created_at", { ascending: false })
        .limit(100),
      (supabaseAdmin as any)
        .from("story_comments")
        .select("id, body, created_at, story_id, author_id, stories(title)")
        .order("created_at", { ascending: false })
        .limit(100),
      (supabaseAdmin as any)
        .from("legends")
        .select("id, name, description, created_at, school_id, author_id, schools(name)")
        .order("created_at", { ascending: false })
        .limit(100),
      (supabaseAdmin as any)
        .from("profiles")
        .select("id, display_handle, created_at, active_school_id, schools(name)")
        .order("created_at", { ascending: false })
        .limit(500),
    ]);

    if (storiesRes.error) throw new Error(storiesRes.error.message);
    if (commentsRes.error) throw new Error(commentsRes.error.message);
    if (legendsRes.error) throw new Error(legendsRes.error.message);
    if (profilesRes.error) throw new Error(profilesRes.error.message);

    // Attempt to fetch emails from Supabase Auth admin API (requires service role key)
    let authUsersMap: Record<string, string> = {};
    try {
      const { data: usersData, error: usersErr } = await supabaseAdmin.auth.admin.listUsers();
      if (!usersErr && usersData?.users) {
        for (const u of usersData.users) {
          if (u.email) {
            authUsersMap[u.id] = u.email;
          }
        }
      }
    } catch (e) {
      console.warn("Failed to fetch auth users list (likely using publishable key fallback):", e);
    }

    // Construct user details list
    const users = (profilesRes.data ?? []).map((p: any) => ({
      id: p.id,
      display_handle: p.display_handle,
      created_at: p.created_at,
      active_school: p.schools?.name ?? null,
      email: authUsersMap[p.id] ?? null,
    }));

    // Construct a map of all users/profiles for fast lookups
    const userMap = new Map<string, { email: string | null; handle: string }>();
    for (const u of users) {
      userMap.set(u.id, { email: u.email, handle: u.display_handle });
    }

    const enrich = (item: any) => {
      const author = userMap.get(item.author_id) ?? { email: null, handle: "Anonymous User" };
      return {
        ...item,
        author_email: author.email,
        author_handle: author.handle,
      };
    };

    return {
      stories: (storiesRes.data ?? []).map(enrich),
      comments: (commentsRes.data ?? []).map(enrich),
      legends: (legendsRes.data ?? []).map(enrich),
      users,
    };
  });

export const adminDeleteStory = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { error } = await (supabaseAdmin as any).from("stories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteComment = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { error } = await (supabaseAdmin as any).from("story_comments").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteLegend = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { error } = await (supabaseAdmin as any).from("legends").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
