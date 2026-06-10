import { c as createServerRpc, s as supabaseAdmin } from "./client.server-JGfmWo_d.mjs";
import { b as createServerFn } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, b as booleanType } from "../_libs/zod.mjs";
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
const listLegends_createServerFn_handler = createServerRpc({
  id: "c316399c5e9baf9c540f078df41f24750b8fb48203f870f53b12054168955e28",
  name: "listLegends",
  filename: "src/lib/legends.functions.ts"
}, (opts) => listLegends.__executeServer(opts));
const listLegends = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  schoolId: stringType().uuid()
}).parse(d)).handler(listLegends_createServerFn_handler, async ({
  data
}) => {
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("legends").select("id, name, description, score, created_at, author_id").eq("school_id", data.schoolId).order("score", {
    ascending: false
  }).order("created_at", {
    ascending: false
  }).limit(100);
  if (error) throw new Error(error.message);
  return {
    legends: rows ?? []
  };
});
const createLegend_createServerFn_handler = createServerRpc({
  id: "bc7ad6796ea28879168cd9a129e2ba1ccd669cdb98dbb60b4100f37f636baf80",
  name: "createLegend",
  filename: "src/lib/legends.functions.ts"
}, (opts) => createLegend.__executeServer(opts));
const createLegend = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  schoolId: stringType().uuid(),
  name: stringType().trim().min(2).max(80),
  description: stringType().trim().min(5).max(500)
}).parse(d)).handler(createLegend_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: legend,
    error
  } = await supabase.from("legends").insert({
    school_id: data.schoolId,
    author_id: userId,
    name: data.name,
    description: data.description
  }).select("id").single();
  if (error) throw new Error(error.message);
  return {
    id: legend.id
  };
});
const deleteLegend_createServerFn_handler = createServerRpc({
  id: "c7eb9073b121a2f550a9dbcb437d41ffdcd51a778bdff8367c14b2472188bf92",
  name: "deleteLegend",
  filename: "src/lib/legends.functions.ts"
}, (opts) => deleteLegend.__executeServer(opts));
const deleteLegend = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(deleteLegend_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase
  } = context;
  const {
    error
  } = await supabase.from("legends").delete().eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const voteLegend_createServerFn_handler = createServerRpc({
  id: "13644924f0050d2eed3511d6038cdae1d0a98c793ba6bedf6d0cf55844c80cd8",
  name: "voteLegend",
  filename: "src/lib/legends.functions.ts"
}, (opts) => voteLegend.__executeServer(opts));
const voteLegend = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  legendId: stringType().uuid(),
  on: booleanType()
}).parse(d)).handler(voteLegend_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  if (data.on) {
    await supabase.from("legend_votes").upsert({
      legend_id: data.legendId,
      user_id: userId
    }, {
      onConflict: "legend_id,user_id"
    });
  } else {
    await supabase.from("legend_votes").delete().eq("legend_id", data.legendId).eq("user_id", userId);
  }
  return {
    ok: true
  };
});
const getHomeSnapshot_createServerFn_handler = createServerRpc({
  id: "248d68493b8f0f7cdf9341e5093a6c971839512969c43eb4b14644e3f53acc1c",
  name: "getHomeSnapshot",
  filename: "src/lib/legends.functions.ts"
}, (opts) => getHomeSnapshot.__executeServer(opts));
const getHomeSnapshot = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  schoolId: stringType().uuid().optional()
}).parse(d)).handler(getHomeSnapshot_createServerFn_handler, async ({
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
      data: s
    } = await supabaseAdmin.from("schools").select("id, slug, name").order("created_at", {
      ascending: false
    }).limit(1).maybeSingle();
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
  schoolId = school.id;
  const {
    data: topLegends
  } = await supabaseAdmin.from("legends").select("id, name, description, score").eq("school_id", schoolId).order("score", {
    ascending: false
  }).order("created_at", {
    ascending: false
  }).limit(3);
  const {
    data: trendingStories
  } = await supabaseAdmin.from("stories").select("id, title, body, category, score, created_at").eq("school_id", schoolId).order("score", {
    ascending: false
  }).order("created_at", {
    ascending: false
  }).limit(3);
  return {
    school,
    topLegends: topLegends ?? [],
    trendingStories: trendingStories ?? []
  };
});
export {
  createLegend_createServerFn_handler,
  deleteLegend_createServerFn_handler,
  getHomeSnapshot_createServerFn_handler,
  listLegends_createServerFn_handler,
  voteLegend_createServerFn_handler
};
