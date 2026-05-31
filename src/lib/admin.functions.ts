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
    const [storiesRes, commentsRes, legendsRes] = await Promise.all([
      (supabaseAdmin as any)
        .from("stories")
        .select("id, title, body, category, created_at, school_id, schools(name)")
        .order("created_at", { ascending: false })
        .limit(50),
      (supabaseAdmin as any)
        .from("story_comments")
        .select("id, body, created_at, story_id, stories(title)")
        .order("created_at", { ascending: false })
        .limit(50),
      (supabaseAdmin as any)
        .from("legends")
        .select("id, name, description, created_at, school_id, schools(name)")
        .order("created_at", { ascending: false })
        .limit(50),
    ]);

    if (storiesRes.error) throw new Error(storiesRes.error.message);
    if (commentsRes.error) throw new Error(commentsRes.error.message);
    if (legendsRes.error) throw new Error(legendsRes.error.message);

    return {
      stories: storiesRes.data ?? [],
      comments: commentsRes.data ?? [],
      legends: legendsRes.data ?? [],
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
