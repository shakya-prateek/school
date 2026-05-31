import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const STORY_CATEGORIES = [
  "teachers",
  "exams",
  "backbenchers",
  "school_trips",
  "friend_groups",
  "classroom_chaos",
  "confessions",
] as const;
export type StoryCategory = (typeof STORY_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<StoryCategory, string> = {
  teachers: "Teachers",
  exams: "Exams",
  backbenchers: "Backbenchers",
  school_trips: "School Trips",
  friend_groups: "Friend Groups",
  classroom_chaos: "Classroom Chaos",
  confessions: "Confessions",
};

// Trending score: score * exp(-age_hours / 24)
function trendingScore(score: number, createdAt: string) {
  const ageHours = (Date.now() - new Date(createdAt).getTime()) / 3_600_000;
  return score * Math.exp(-ageHours / 24);
}

export const listStories = createServerFn({ method: "POST" })
  .inputValidator(
    (d: { schoolId: string; sort?: "trending" | "newest"; category?: string; q?: string }) =>
      z
        .object({
          schoolId: z.string().uuid(),
          sort: z.enum(["trending", "newest"]).optional().default("newest"),
          category: z.enum(STORY_CATEGORIES).optional(),
          q: z.string().max(100).optional(),
        })
        .parse(d),
  )
  .handler(async ({ data }) => {
    let q = (supabaseAdmin as any)
      .from("stories")
      .select(
        "id, title, body, category, score, comment_count, created_at, author_id, profiles!stories_author_id_fkey(display_handle)",
      )
      .eq("school_id", data.schoolId);
    if (data.category) q = q.eq("category", data.category);
    if (data.q) q = q.ilike("title", `%${data.q}%`);
    q = q.order("created_at", { ascending: false }).limit(100);
    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);
    let stories = (rows ?? []) as any[];
    if (data.sort === "trending") {
      stories = [...stories].sort(
        (a, b) => trendingScore(b.score, b.created_at) - trendingScore(a.score, a.created_at),
      );
    }
    return { stories };
  });

export const getStory = createServerFn({ method: "POST" })
  .inputValidator((d: { id: string }) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { data: story, error } = await (supabaseAdmin as any)
      .from("stories")
      .select(
        "id, title, body, category, score, comment_count, created_at, school_id, author_id, profiles!stories_author_id_fkey(display_handle), schools(id, slug, name)",
      )
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!story) throw new Error("Story not found");

    const { data: comments } = await (supabaseAdmin as any)
      .from("story_comments")
      .select("id, body, created_at, author_id, profiles!story_comments_author_id_fkey(display_handle)")
      .eq("story_id", data.id)
      .order("created_at", { ascending: false });

    return { story, comments: comments ?? [] };
  });

export const createStory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (d: { schoolId: string; title: string; body: string; category: string }) =>
      z
        .object({
          schoolId: z.string().uuid(),
          title: z.string().trim().min(3).max(140),
          body: z.string().trim().min(5).max(5000),
          category: z.enum(STORY_CATEGORIES),
        })
        .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    const { data: story, error } = await (supabase as any)
      .from("stories")
      .insert({
        school_id: data.schoolId,
        author_id: userId,
        title: data.title,
        body: data.body,
        category: data.category,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: story.id };
  });

export const voteStory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { storyId: string; value: -1 | 0 | 1 }) =>
    z
      .object({ storyId: z.string().uuid(), value: z.union([z.literal(-1), z.literal(0), z.literal(1)]) })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    if (data.value === 0) {
      await (supabase as any)
        .from("story_votes")
        .delete()
        .eq("story_id", data.storyId)
        .eq("user_id", userId);
    } else {
      await (supabase as any)
        .from("story_votes")
        .upsert(
          { story_id: data.storyId, user_id: userId, value: data.value },
          { onConflict: "story_id,user_id" },
        );
    }
    return { ok: true };
  });

export const addComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { storyId: string; body: string }) =>
    z.object({ storyId: z.string().uuid(), body: z.string().trim().min(1).max(1000) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context as any;
    const { error } = await (supabase as any)
      .from("story_comments")
      .insert({ story_id: data.storyId, author_id: userId, body: data.body });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
