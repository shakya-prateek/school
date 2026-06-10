import { c as createSsrRpc } from "./createSsrRpc-iIgatL4r.mjs";
import { b as createServerFn } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
import { o as objectType, s as stringType, e as enumType, u as unionType, l as literalType } from "../_libs/zod.mjs";
const STORY_CATEGORIES = ["teachers", "exams", "backbenchers", "school_trips", "friend_groups", "classroom_chaos", "confessions"];
const CATEGORY_LABELS = {
  teachers: "Teachers",
  exams: "Exams",
  backbenchers: "Backbenchers",
  school_trips: "School Trips",
  friend_groups: "Friend Groups",
  classroom_chaos: "Classroom Chaos",
  confessions: "Confessions"
};
const listStories = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  schoolId: stringType().uuid(),
  sort: enumType(["trending", "newest"]).optional().default("newest"),
  category: enumType(STORY_CATEGORIES).optional(),
  q: stringType().max(100).optional()
}).parse(d)).handler(createSsrRpc("f3fe6bc72a31fefc3ea4da79573284891b4a8eb658b2418c03994f4bf4068ef3"));
const getStory = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("67cea79e1b2d7364c35b2a2398042c14a6dc8007152905ada80511afc6baef01"));
const createStory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  schoolId: stringType().uuid(),
  title: stringType().trim().min(3).max(140),
  body: stringType().trim().min(5).max(5e3),
  category: enumType(STORY_CATEGORIES)
}).parse(d)).handler(createSsrRpc("22f2c902a798927e882bcc749380ee9ca03d07d19bb48eb1ad29e0f4932d9b77"));
const voteStory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  storyId: stringType().uuid(),
  value: unionType([literalType(-1), literalType(0), literalType(1)])
}).parse(d)).handler(createSsrRpc("a8319c7f0c408576b00e288320a90f003b071a621db3204bca72625278ecf0c0"));
const deleteStory = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("0db884dd2f39e9887fef1d0f2c0c081e14cda60d8fca72fedd2f947b99d6fc6e"));
const addComment = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  storyId: stringType().uuid(),
  body: stringType().trim().min(1).max(1e3)
}).parse(d)).handler(createSsrRpc("afa97792f490e14913a67f9cba3a0be61c19fc26947db491ce87b70365031602"));
export {
  CATEGORY_LABELS as C,
  STORY_CATEGORIES as S,
  addComment as a,
  createStory as c,
  deleteStory as d,
  getStory as g,
  listStories as l,
  voteStory as v
};
