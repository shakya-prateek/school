import { c as createServerRpc, s as supabaseAdmin } from "./client.server-JGfmWo_d.mjs";
import { b as createServerFn } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
import { i as isAdminEmail, e as emailFromClaims, r as requireAdmin } from "./admin-middleware-CA7tFpqM.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
const checkIsAdmin_createServerFn_handler = createServerRpc({
  id: "d7ab752d5c5280d2ee84a9875749b1cba0d95c7bbe892baa67e4f3368bfac36c",
  name: "checkIsAdmin",
  filename: "src/lib/admin.functions.ts"
}, (opts) => checkIsAdmin.__executeServer(opts));
const checkIsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(checkIsAdmin_createServerFn_handler, async ({
  context
}) => {
  const claims = context.claims;
  return {
    isAdmin: isAdminEmail(emailFromClaims(claims))
  };
});
const adminGetModerationQueue_createServerFn_handler = createServerRpc({
  id: "0f199937ba96634e4df620d8ae98cc89f9b9877b1f31e84b7cb4d658adae2772",
  name: "adminGetModerationQueue",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminGetModerationQueue.__executeServer(opts));
const adminGetModerationQueue = createServerFn({
  method: "POST"
}).middleware([requireAdmin]).handler(adminGetModerationQueue_createServerFn_handler, async () => {
  const [storiesRes, commentsRes, legendsRes, profilesRes] = await Promise.all([supabaseAdmin.from("stories").select("id, title, body, category, created_at, school_id, author_id, schools(name)").order("created_at", {
    ascending: false
  }).limit(100), supabaseAdmin.from("story_comments").select("id, body, created_at, story_id, author_id, stories(title)").order("created_at", {
    ascending: false
  }).limit(100), supabaseAdmin.from("legends").select("id, name, description, created_at, school_id, author_id, schools(name)").order("created_at", {
    ascending: false
  }).limit(100), supabaseAdmin.from("profiles").select("id, display_handle, created_at, active_school_id, schools(name)").order("created_at", {
    ascending: false
  }).limit(500)]);
  if (storiesRes.error) throw new Error(storiesRes.error.message);
  if (commentsRes.error) throw new Error(commentsRes.error.message);
  if (legendsRes.error) throw new Error(legendsRes.error.message);
  if (profilesRes.error) throw new Error(profilesRes.error.message);
  let authUsersMap = {};
  try {
    const {
      data: usersData,
      error: usersErr
    } = await supabaseAdmin.auth.admin.listUsers();
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
  const users = (profilesRes.data ?? []).map((p) => ({
    id: p.id,
    display_handle: p.display_handle,
    created_at: p.created_at,
    active_school: p.schools?.name ?? null,
    email: authUsersMap[p.id] ?? null
  }));
  const userMap = /* @__PURE__ */ new Map();
  for (const u of users) {
    userMap.set(u.id, {
      email: u.email,
      handle: u.display_handle
    });
  }
  const enrich = (item) => {
    const author = userMap.get(item.author_id) ?? {
      email: null,
      handle: "Anonymous User"
    };
    return {
      ...item,
      author_email: author.email,
      author_handle: author.handle
    };
  };
  return {
    stories: (storiesRes.data ?? []).map(enrich),
    comments: (commentsRes.data ?? []).map(enrich),
    legends: (legendsRes.data ?? []).map(enrich),
    users
  };
});
const adminDeleteStory_createServerFn_handler = createServerRpc({
  id: "6bce6d596230d9b3628aa40aa934a3e7427808cc0545d6f26f959c5c762fe502",
  name: "adminDeleteStory",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteStory.__executeServer(opts));
const adminDeleteStory = createServerFn({
  method: "POST"
}).middleware([requireAdmin]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(adminDeleteStory_createServerFn_handler, async ({
  data
}) => {
  const {
    error
  } = await supabaseAdmin.from("stories").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminDeleteComment_createServerFn_handler = createServerRpc({
  id: "6db5b19256028e899bf7983d6f88dd59c4706a4416ab35c9dfd77daf135aa118",
  name: "adminDeleteComment",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteComment.__executeServer(opts));
const adminDeleteComment = createServerFn({
  method: "POST"
}).middleware([requireAdmin]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(adminDeleteComment_createServerFn_handler, async ({
  data
}) => {
  const {
    error
  } = await supabaseAdmin.from("story_comments").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const adminDeleteLegend_createServerFn_handler = createServerRpc({
  id: "fbf83f098b899728d5fd93272579e99417eabf8577eb5e65ee7857e4933b27dc",
  name: "adminDeleteLegend",
  filename: "src/lib/admin.functions.ts"
}, (opts) => adminDeleteLegend.__executeServer(opts));
const adminDeleteLegend = createServerFn({
  method: "POST"
}).middleware([requireAdmin]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(adminDeleteLegend_createServerFn_handler, async ({
  data
}) => {
  const {
    error
  } = await supabaseAdmin.from("legends").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
export {
  adminDeleteComment_createServerFn_handler,
  adminDeleteLegend_createServerFn_handler,
  adminDeleteStory_createServerFn_handler,
  adminGetModerationQueue_createServerFn_handler,
  checkIsAdmin_createServerFn_handler
};
