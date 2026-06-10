import { T as TSS_SERVER_FUNCTION } from "./server-CQXPTDvh.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function createSupabaseAdminClient() {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  let serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL) {
    console.error("[Supabase] Missing SUPABASE_URL environment variable.");
    throw new Error("Missing Supabase URL");
  }
  if (!serviceRoleKey || serviceRoleKey === "YOUR_SUPABASE_SERVICE_ROLE_KEY_HERE") {
    console.warn(
      "[Supabase Server] SUPABASE_SERVICE_ROLE_KEY is not configured or is a placeholder. Falling back to SUPABASE_PUBLISHABLE_KEY. Note: Operation will run with public privileges."
    );
    serviceRoleKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  }
  if (!serviceRoleKey) {
    const message = "Missing both SUPABASE_SERVICE_ROLE_KEY and SUPABASE_PUBLISHABLE_KEY environment variables.";
    console.error(`[Supabase] ${message}`);
    throw new Error(message);
  }
  return createClient(SUPABASE_URL, serviceRoleKey, {
    auth: {
      storage: void 0,
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
let _supabaseAdmin;
const supabaseAdmin = new Proxy({}, {
  get(_, prop, receiver) {
    if (!_supabaseAdmin) _supabaseAdmin = createSupabaseAdminClient();
    return Reflect.get(_supabaseAdmin, prop, receiver);
  }
});
export {
  createServerRpc as c,
  supabaseAdmin as s
};
