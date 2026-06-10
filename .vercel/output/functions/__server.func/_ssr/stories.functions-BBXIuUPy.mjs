import { c as createServerRpc, s as supabaseAdmin } from "./client.server-JGfmWo_d.mjs";
import { b as createServerFn } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, e as enumType, u as unionType, l as literalType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const STORY_CATEGORIES = ["teachers", "exams", "backbenchers", "school_trips", "friend_groups", "classroom_chaos", "confessions"];
function trendingScore(score, createdAt) {
  const ageHours = (Date.now() - new Date(createdAt).getTime()) / 36e5;
  return score * Math.exp(-ageHours / 24);
}
const listStories_createServerFn_handler = createServerRpc({
  id: "f3fe6bc72a31fefc3ea4da79573284891b4a8eb658b2418c03994f4bf4068ef3",
  name: "listStories",
  filename: "src/lib/stories.functions.ts"
}, (opts) => listStories.__executeServer(opts));
const listStories = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  schoolId: stringType().uuid(),
  sort: enumType(["trending", "newest"]).optional().default("newest"),
  category: enumType(STORY_CATEGORIES).optional(),
  q: stringType().max(100).optional()
}).parse(d)).handler(listStories_createServerFn_handler, async ({
  data
}) => {
  let q = supabaseAdmin.from("stories").select("id, title, body, category, score, comment_count, created_at, author_id").eq("school_id", data.schoolId);
  if (data.category) q = q.eq("category", data.category);
  if (data.q) q = q.ilike("title", `%${data.q}%`);
  q = q.order("created_at", {
    ascending: false
  }).limit(100);
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  let stories = rows ?? [];
  if (data.sort === "trending") {
    stories = [...stories].sort((a, b) => trendingScore(b.score, b.created_at) - trendingScore(a.score, a.created_at));
  }
  return {
    stories
  };
});
const getStory_createServerFn_handler = createServerRpc({
  id: "67cea79e1b2d7364c35b2a2398042c14a6dc8007152905ada80511afc6baef01",
  name: "getStory",
  filename: "src/lib/stories.functions.ts"
}, (opts) => getStory.__executeServer(opts));
const getStory = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(getStory_createServerFn_handler, async ({
  data
}) => {
  const {
    data: story,
    error
  } = await supabaseAdmin.from("stories").select("id, title, body, category, score, comment_count, created_at, school_id, author_id, schools(id, slug, name)").eq("id", data.id).maybeSingle();
  if (error) throw new Error(error.message);
  if (!story) throw new Error("Story not found");
  const {
    data: comments
  } = await supabaseAdmin.from("story_comments").select("id, body, created_at, author_id").eq("story_id", data.id).order("created_at", {
    ascending: false
  });
  return {
    story,
    comments: comments ?? []
  };
});
const createStory_createServerFn_handler = createServerRpc({
  id: "22f2c902a798927e882bcc749380ee9ca03d07d19bb48eb1ad29e0f4932d9b77",
  name: "createStory",
  filename: "src/lib/stories.functions.ts"
}, (opts) => createStory.__executeServer(opts));
const createStory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  schoolId: stringType().uuid(),
  title: stringType().trim().min(3).max(140),
  body: stringType().trim().min(5).max(5e3),
  category: enumType(STORY_CATEGORIES)
}).parse(d)).handler(createStory_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: story,
    error
  } = await supabase.from("stories").insert({
    school_id: data.schoolId,
    author_id: userId,
    title: data.title,
    body: data.body,
    category: data.category
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: story.id
  };
});
const voteStory_createServerFn_handler = createServerRpc({
  id: "a8319c7f0c408576b00e288320a90f003b071a621db3204bca72625278ecf0c0",
  name: "voteStory",
  filename: "src/lib/stories.functions.ts"
}, (opts) => voteStory.__executeServer(opts));
const voteStory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  storyId: stringType().uuid(),
  value: unionType([literalType(-1), literalType(0), literalType(1)])
}).parse(d)).handler(voteStory_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  if (data.value === 0) {
    await supabase.from("story_votes").delete().eq("story_id", data.storyId).eq("user_id", userId);
  } else {
    await supabase.from("story_votes").upsert({
      story_id: data.storyId,
      user_id: userId,
      value: data.value
    }, {
      onConflict: "story_id,user_id"
    });
  }
  return {
    ok: true
  };
});
const deleteStory_createServerFn_handler = createServerRpc({
  id: "0db884dd2f39e9887fef1d0f2c0c081e14cda60d8fca72fedd2f947b99d6fc6e",
  name: "deleteStory",
  filename: "src/lib/stories.functions.ts"
}, (opts) => deleteStory.__executeServer(opts));
const deleteStory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteStory_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase
  } = context;
  const {
    error
  } = await supabase.from("stories").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const addComment_createServerFn_handler = createServerRpc({
  id: "afa97792f490e14913a67f9cba3a0be61c19fc26947db491ce87b70365031602",
  name: "addComment",
  filename: "src/lib/stories.functions.ts"
}, (opts) => addComment.__executeServer(opts));
const addComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  storyId: stringType().uuid(),
  body: stringType().trim().min(1).max(1e3)
}).parse(d)).handler(addComment_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    error
  } = await supabase.from("story_comments").insert({
    story_id: data.storyId,
    author_id: userId,
    body: data.body
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  addComment_createServerFn_handler,
  createStory_createServerFn_handler,
  deleteStory_createServerFn_handler,
  getStory_createServerFn_handler,
  listStories_createServerFn_handler,
  voteStory_createServerFn_handler
};
