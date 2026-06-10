import { c as createSsrRpc } from "./createSsrRpc-iIgatL4r.mjs";
import { b as createServerFn } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
import { o as objectType, b as booleanType, s as stringType } from "../_libs/zod.mjs";
const listLegends = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  schoolId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("c316399c5e9baf9c540f078df41f24750b8fb48203f870f53b12054168955e28"));
const createLegend = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  schoolId: stringType().uuid(),
  name: stringType().trim().min(2).max(80),
  description: stringType().trim().min(5).max(500)
}).parse(d)).handler(createSsrRpc("bc7ad6796ea28879168cd9a129e2ba1ccd669cdb98dbb60b4100f37f636baf80"));
const deleteLegend = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("c7eb9073b121a2f550a9dbcb437d41ffdcd51a778bdff8367c14b2472188bf92"));
const voteLegend = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  legendId: stringType().uuid(),
  on: booleanType()
}).parse(d)).handler(createSsrRpc("13644924f0050d2eed3511d6038cdae1d0a98c793ba6bedf6d0cf55844c80cd8"));
const getHomeSnapshot = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  schoolId: stringType().uuid().optional()
}).parse(d)).handler(createSsrRpc("248d68493b8f0f7cdf9341e5093a6c971839512969c43eb4b14644e3f53acc1c"));
export {
  createLegend as c,
  deleteLegend as d,
  getHomeSnapshot as g,
  listLegends as l,
  voteLegend as v
};
