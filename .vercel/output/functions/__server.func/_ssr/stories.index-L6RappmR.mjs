import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-iIgatL4r.mjs";
import { D as DeleteOwnContentButton } from "./DeleteOwnContentButton-B7xUpLVM.mjs";
import { S as SiteNav } from "./SiteNav-Dt9k7nVg.mjs";
import { u as useAuth } from "./router-5JLFb6t2.mjs";
import { g as getMyContext, r as resolveViewSchool } from "./schools.functions-EkK2lRXY.mjs";
import { S as STORY_CATEGORIES, C as CATEGORY_LABELS, d as deleteStory, l as listStories } from "./stories.functions-BwGeYBbE.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-CQXPTDvh.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lucide-react.mjs";
import "./client-D6wJbO6y.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tailwind-merge.mjs";
import "./auth-middleware-ovHzplJn.mjs";
import "../_libs/zod.mjs";
function StoriesPage() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const [sort, setSort] = reactExports.useState("newest");
  const [category, setCategory] = reactExports.useState("");
  const [q, setQ] = reactExports.useState("");
  const fetchCtx = useServerFn(getMyContext);
  const fetchViewSchool = useServerFn(resolveViewSchool);
  const fetchStories = useServerFn(listStories);
  const doDelete = useServerFn(deleteStory);
  const {
    data: ctx
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCtx(),
    enabled: !!user
  });
  const activeSchoolId = ctx?.activeSchool?.id;
  const {
    data: viewSchool
  } = useQuery({
    queryKey: ["viewSchool", activeSchoolId ?? "default"],
    queryFn: () => fetchViewSchool({
      data: {
        schoolId: activeSchoolId
      }
    })
  });
  const schoolId = viewSchool?.school?.id;
  const schoolName = viewSchool?.school?.name ?? ctx?.activeSchool?.name;
  const {
    data,
    isError,
    error
  } = useQuery({
    queryKey: ["stories", schoolId, sort, category, q],
    queryFn: () => fetchStories({
      data: {
        schoolId,
        sort,
        category: category || void 0,
        q: q || void 0
      }
    }),
    enabled: !!schoolId
  });
  const remove = useMutation({
    mutationFn: (storyId) => doDelete({
      data: {
        id: storyId
      }
    }),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ["stories"]
      });
      await qc.invalidateQueries({
        queryKey: ["home"]
      });
      toast.success("Story deleted");
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-paper text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, { schoolName }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 md:px-8 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: "Memories" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-xl opacity-70", children: schoolName ? `From ${schoolName}` : "Pick a school to see stories" })
        ] }),
        schoolId && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories/new", className: "bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all", children: "+ Post Story" })
      ] }),
      !schoolId ? /* @__PURE__ */ jsxRuntimeExports.jsx(NoSchool, {}) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-red-600 font-hand text-xl py-16", children: error.message }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mb-8 items-stretch sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: q, onChange: (e) => setQ(e.target.value), placeholder: "Search titles...", className: "px-3 py-2 border-2 border-ink rounded bg-card text-sm w-full sm:w-64" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "px-3 py-2 border-2 border-ink rounded bg-card text-sm font-bold w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "All categories" }),
            STORY_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: CATEGORY_LABELS[c] }, c))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex border-2 border-ink rounded overflow-hidden text-sm font-bold w-full sm:w-auto", children: ["newest", "trending"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSort(s), className: `flex-1 sm:flex-initial text-center px-4 py-2 cursor-pointer ${sort === s ? "bg-foreground text-background" : "bg-card"}`, children: s === "newest" ? "Newest" : "Trending" }, s)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6", children: [
          (data?.stories ?? []).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories/$id", params: {
              id: s.id
            }, className: "block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-card border-2 border-ink p-6 rounded-xl shadow-zine relative hover:-translate-y-1 hover:-translate-x-1 transition-transform", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute -top-3 -left-2 text-white text-xs font-bold px-2 py-1 ${i % 2 === 0 ? "bg-marker-blue -rotate-3" : "bg-marker-pink rotate-2"}`, children: [
                "#",
                CATEGORY_LABELS[s.category]?.toUpperCase()
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4 items-start mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold", children: s.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-paper border-2 border-ink p-2 rounded-lg shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "▲" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: s.score })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-lg opacity-80 line-clamp-3 mb-4", children: s.body }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-xs font-bold opacity-50 uppercase tracking-widest", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Anonymous" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  s.comment_count ?? 0,
                  " comments"
                ] })
              ] })
            ] }) }),
            user?.id === s.author_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteOwnContentButton, { kind: "story", isPending: remove.isPending, onConfirm: () => remove.mutate(s.id) }) })
          ] }, s.id)),
          (data?.stories ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center opacity-50 font-hand text-xl py-16", children: "No stories here yet. Start the legend." })
        ] })
      ] })
    ] })
  ] });
}
function NoSchool() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-2 border-dashed border-ink/30 p-12 rounded-xl text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-2xl opacity-70 mb-4", children: "No schools yet. Create one to get started." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/schools", className: "bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm", children: "Add a school" })
  ] });
}
export {
  StoriesPage as component
};
