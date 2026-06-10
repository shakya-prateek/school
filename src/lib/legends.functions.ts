import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const listLegends = createServerFn({ method: "POST" })
  .inputValidator((d: { schoolId: string }) => z.object({ schoolId: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { data: rows, error } = await (supabaseAdmin as any)
      .from("legends")
      .select("id, name, description, score, created_at, author_id")
      .eq("school_id", data.schoolId)
      .order("score", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw new Error(error.message);
    return { legends: rows ?? [] };
  });

export const createLegend = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { schoolId: string; name: string; description: string }) =>
    z
      .object({
        schoolId: z.string().uuid(),
        name: z.string().trim().min(2).max(80),
        description: z.string().trim().min(5).max(500),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    const { data: legend, error } = await (supabase as any)
      .from("legends")
      .insert({
        school_id: data.schoolId,
        author_id: userId,
        name: data.name,
        description: data.description,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: legend.id };
  });

export const deleteLegend = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabase } = context as any;
    const { error } = await (supabase as any).from("legends").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const voteLegend = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { legendId: string; on: boolean }) =>
    z.object({ legendId: z.string().uuid(), on: z.boolean() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    if (data.on) {
      await (supabase as any)
        .from("legend_votes")
        .upsert({ legend_id: data.legendId, user_id: userId }, { onConflict: "legend_id,user_id" });
    } else {
      await (supabase as any)
        .from("legend_votes")
        .delete()
        .eq("legend_id", data.legendId)
        .eq("user_id", userId);
    }
    return { ok: true };
  });

export const getHomeSnapshot = createServerFn({ method: "POST" })
  .inputValidator((d: { schoolId?: string }) =>
    z.object({ schoolId: z.string().uuid().optional() }).parse(d),
  )
  .handler(async ({ data }) => {
    let schoolId = data.schoolId;
    let school: any = null;
    if (schoolId) {
      const { data: s } = await (supabaseAdmin as any)
        .from("schools")
        .select("id, slug, name")
        .eq("id", schoolId)
        .maybeSingle();
      school = s;
    }
    if (!school) {
      const { data: s } = await (supabaseAdmin as any)
        .from("schools")
        .select("id, slug, name")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      school = s;
    }
    if (!school) {
      const { data: s, error: insertError } = await (supabaseAdmin as any)
        .from("schools")
        .insert({ name: "BunkyBloom Academy", slug: "bunkybloom-academy" })
        .select("id, slug, name")
        .single();
      if (insertError) throw new Error(insertError.message);
      school = s;
    }
    schoolId = school.id;

    const { data: topLegends } = await (supabaseAdmin as any)
      .from("legends")
      .select("id, name, description, score")
      .eq("school_id", schoolId)
      .order("score", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3);

    const { data: trendingStories } = await (supabaseAdmin as any)
      .from("stories")
      .select("id, title, body, category, score, created_at")
      .eq("school_id", schoolId)
      .order("score", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(3);

    return {
      school,
      topLegends: topLegends ?? [],
      trendingStories: trendingStories ?? [],
    };
  });
