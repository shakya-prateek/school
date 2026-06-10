import { c as createServerRpc, s as supabaseAdmin } from "./client.server-JGfmWo_d.mjs";
import { b as createServerFn } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
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
const searchSchools_createServerFn_handler = createServerRpc({
  id: "6e1beb81482022cf0e5ddeefdfd3a5c3773aac62f31a761207ae70e6a8c863b3",
  name: "searchSchools",
  filename: "src/lib/schools.functions.ts"
}, (opts) => searchSchools.__executeServer(opts));
const searchSchools = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  q: stringType().max(100).optional()
}).parse(d)).handler(searchSchools_createServerFn_handler, async ({
  data
}) => {
  const q = (data.q ?? "").trim();
  let query = supabaseAdmin.from("schools").select("id, slug, name, created_at").order("created_at", {
    ascending: false
  }).limit(25);
  if (q) query = query.ilike("name", `%${q}%`);
  const {
    data: rows,
    error
  } = await query;
  if (error) throw new Error(error.message);
  return {
    schools: rows ?? []
  };
});
const slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
const createSchool_createServerFn_handler = createServerRpc({
  id: "ca577dbb70e6e209ba132c1ab56980901a3ddd291c397ee13d565c3a6a7de72f",
  name: "createSchool",
  filename: "src/lib/schools.functions.ts"
}, (opts) => createSchool.__executeServer(opts));
const createSchool = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  name: stringType().trim().min(2).max(80)
}).parse(d)).handler(createSchool_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const baseSlug = slugify(data.name) || "school";
  let slug = baseSlug;
  for (let i = 1; i < 20; i++) {
    const {
      data: existing
    } = await supabaseAdmin.from("schools").select("id").eq("slug", slug).maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${i + 1}`;
  }
  const {
    data: school,
    error
  } = await supabase.from("schools").insert({
    name: data.name,
    slug,
    created_by: userId
  }).select("id, slug, name").single();
  if (error) throw new Error(error.message);
  await supabase.from("school_members").insert({
    school_id: school.id,
    user_id: userId
  });
  await supabase.from("profiles").update({
    active_school_id: school.id
  }).eq("id", userId);
  return {
    school
  };
});
const joinSchool_createServerFn_handler = createServerRpc({
  id: "80560f19893630145f08da502c08746903701be58d557a49fedb4c22fd45a365",
  name: "joinSchool",
  filename: "src/lib/schools.functions.ts"
}, (opts) => joinSchool.__executeServer(opts));
const joinSchool = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  schoolId: stringType().uuid()
}).parse(d)).handler(joinSchool_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await supabase.from("school_members").upsert({
    school_id: data.schoolId,
    user_id: userId
  });
  await supabase.from("profiles").update({
    active_school_id: data.schoolId
  }).eq("id", userId);
  return {
    ok: true
  };
});
const setActiveSchool_createServerFn_handler = createServerRpc({
  id: "2d2faa218a11ac99d470bbb38f657ff9b4ef6196e224e9d23ac5e48d9b3e64d7",
  name: "setActiveSchool",
  filename: "src/lib/schools.functions.ts"
}, (opts) => setActiveSchool.__executeServer(opts));
const setActiveSchool = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  schoolId: stringType().uuid()
}).parse(d)).handler(setActiveSchool_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  await supabase.from("profiles").update({
    active_school_id: data.schoolId
  }).eq("id", userId);
  return {
    ok: true
  };
});
const resolveViewSchool_createServerFn_handler = createServerRpc({
  id: "29d07d4259351e8bc33309a42924957d41b9f9273fd4a0292fb17eb48b528b84",
  name: "resolveViewSchool",
  filename: "src/lib/schools.functions.ts"
}, (opts) => resolveViewSchool.__executeServer(opts));
const resolveViewSchool = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  schoolId: stringType().uuid().optional()
}).parse(d)).handler(resolveViewSchool_createServerFn_handler, async ({
  data
}) => {
  let schoolId = data.schoolId;
  let school = null;
  if (schoolId) {
    const {
      data: s
    } = await supabaseAdmin.from("schools").select("id, slug, name").eq("id", schoolId).maybeSingle();
    school = s;
  }
  if (!school) {
    const {
      data: s,
      error
    } = await supabaseAdmin.from("schools").select("id, slug, name").order("created_at", {
      ascending: false
    }).limit(1).maybeSingle();
    if (error) throw new Error(error.message);
    school = s;
  }
  if (!school) {
    const {
      data: s,
      error: insertError
    } = await supabaseAdmin.from("schools").insert({
      name: "BunkyBloom Academy",
      slug: "bunkybloom-academy"
    }).select("id, slug, name").single();
    if (insertError) throw new Error(insertError.message);
    school = s;
  }
  return {
    school
  };
});
const getMyContext_createServerFn_handler = createServerRpc({
  id: "2f8b9351570846693eb86e22381ef2d73a6be3e88ce859dae9104f31c8d362e3",
  name: "getMyContext",
  filename: "src/lib/schools.functions.ts"
}, (opts) => getMyContext.__executeServer(opts));
const getMyContext = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(getMyContext_createServerFn_handler, async ({
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: profile
  } = await supabase.from("profiles").select("id, display_handle, active_school_id").eq("id", userId).maybeSingle();
  let activeSchool = null;
  if (profile?.active_school_id) {
    const {
      data: s
    } = await supabaseAdmin.from("schools").select("id, slug, name").eq("id", profile.active_school_id).maybeSingle();
    activeSchool = s ?? null;
  }
  const {
    data: memberships
  } = await supabase.from("school_members").select("school_id, schools(id, slug, name)").eq("user_id", userId);
  return {
    profile,
    activeSchool,
    memberships: memberships ?? []
  };
});
export {
  createSchool_createServerFn_handler,
  getMyContext_createServerFn_handler,
  joinSchool_createServerFn_handler,
  resolveViewSchool_createServerFn_handler,
  searchSchools_createServerFn_handler,
  setActiveSchool_createServerFn_handler
};
