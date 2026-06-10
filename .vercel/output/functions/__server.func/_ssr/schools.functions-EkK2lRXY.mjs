import { c as createSsrRpc } from "./createSsrRpc-iIgatL4r.mjs";
import { b as createServerFn } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  q: stringType().max(100).optional()
}).parse(d)).handler(createSsrRpc("6e1beb81482022cf0e5ddeefdfd3a5c3773aac62f31a761207ae70e6a8c863b3"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  name: stringType().trim().min(2).max(80)
}).parse(d)).handler(createSsrRpc("ca577dbb70e6e209ba132c1ab56980901a3ddd291c397ee13d565c3a6a7de72f"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  schoolId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("80560f19893630145f08da502c08746903701be58d557a49fedb4c22fd45a365"));
createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  schoolId: stringType().uuid()
}).parse(d)).handler(createSsrRpc("2d2faa218a11ac99d470bbb38f657ff9b4ef6196e224e9d23ac5e48d9b3e64d7"));
const resolveViewSchool = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  schoolId: stringType().uuid().optional()
}).parse(d)).handler(createSsrRpc("29d07d4259351e8bc33309a42924957d41b9f9273fd4a0292fb17eb48b528b84"));
const getMyContext = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("2f8b9351570846693eb86e22381ef2d73a6be3e88ce859dae9104f31c8d362e3"));
export {
  getMyContext as g,
  resolveViewSchool as r
};
