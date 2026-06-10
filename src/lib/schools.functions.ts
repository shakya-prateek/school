import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// ============ SCHOOLS ============

export const searchSchools = createServerFn({ method: "POST" })
  .inputValidator((d: { q?: string }) => z.object({ q: z.string().max(100).optional() }).parse(d))
  .handler(async ({ data }) => {
    const q = (data.q ?? "").trim();
    let query = (supabaseAdmin as any)
      .from("schools")
      .select("id, slug, name, created_at")
      .order("created_at", { ascending: false })
      .limit(25);
    if (q) query = query.ilike("name", `%${q}%`);
    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);
    return { schools: rows ?? [] };
  });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

export const createSchool = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { name: string }) =>
    z.object({ name: z.string().trim().min(2).max(80) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    const baseSlug = slugify(data.name) || "school";
    let slug = baseSlug;
    for (let i = 1; i < 20; i++) {
      const { data: existing } = await (supabaseAdmin as any)
        .from("schools")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();
      if (!existing) break;
      slug = `${baseSlug}-${i + 1}`;
    }
    const { data: school, error } = await (supabase as any)
      .from("schools")
      .insert({ name: data.name, slug, created_by: userId })
      .select("id, slug, name")
      .single();
    if (error) throw new Error(error.message);

    await (supabase as any)
      .from("school_members")
      .insert({ school_id: school.id, user_id: userId });
    await (supabase as any)
      .from("profiles")
      .update({ active_school_id: school.id })
      .eq("id", userId);
    return { school };
  });

export const joinSchool = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { schoolId: string }) => z.object({ schoolId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    await (supabase as any)
      .from("school_members")
      .upsert({ school_id: data.schoolId, user_id: userId });
    await (supabase as any)
      .from("profiles")
      .update({ active_school_id: data.schoolId })
      .eq("id", userId);
    return { ok: true };
  });

export const setActiveSchool = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { schoolId: string }) => z.object({ schoolId: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    await (supabase as any)
      .from("profiles")
      .update({ active_school_id: data.schoolId })
      .eq("id", userId);
    return { ok: true };
  });

export async function getSingleArchiveSchool() {
  // 1. Try to find school with slug 'default-school'
  let { data: school } = await (supabaseAdmin as any)
    .from("schools")
    .select("id, slug, name")
    .eq("slug", "default-school")
    .maybeSingle();

  // 2. If not found, try any other school containing 'bunkybloom'
  if (!school) {
    const { data: s } = await (supabaseAdmin as any)
      .from("schools")
      .select("id, slug, name")
      .ilike("slug", "%bunkybloom%")
      .limit(1)
      .maybeSingle();
    school = s;
  }

  // 3. If still no school, create/ensure the default one
  if (!school) {
    const { data: s, error: insertError } = await (supabaseAdmin as any)
      .from("schools")
      .insert({
        id: "e69c0384-784b-40ec-b388-e8826d7f9907",
        name: "BunkyBloom Community",
        slug: "default-school"
      })
      .select("id, slug, name")
      .single();
    if (insertError) throw new Error(insertError.message);
    school = s;
  }

  return school;
}

/** Same school resolution as the home page: active school, or latest school in the DB. */
export const resolveViewSchool = createServerFn({ method: "POST" })
  .inputValidator((d: { schoolId?: string }) =>
    z.object({ schoolId: z.string().uuid().optional() }).parse(d),
  )
  .handler(async () => {
    const school = await getSingleArchiveSchool();
    return { school };
  });

export const getMyContext = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context as any;
    const { data: profile } = await (supabase as any)
      .from("profiles")
      .select("id, display_handle, active_school_id")
      .eq("id", userId)
      .maybeSingle();

    const activeSchool = await getSingleArchiveSchool();

    if (profile && profile.active_school_id !== activeSchool.id) {
      await (supabase as any)
        .from("profiles")
        .update({ active_school_id: activeSchool.id })
        .eq("id", userId);
      profile.active_school_id = activeSchool.id;
    }

    const { data: memberships } = await (supabase as any)
      .from("school_members")
      .select("school_id, schools(id, slug, name)")
      .eq("user_id", userId);
    return { profile, activeSchool, memberships: memberships ?? [] };
  });
