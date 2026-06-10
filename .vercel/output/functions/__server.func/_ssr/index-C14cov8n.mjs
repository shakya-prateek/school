import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-iIgatL4r.mjs";
import { S as SiteNav } from "./SiteNav-Dt9k7nVg.mjs";
import { g as getHomeSnapshot } from "./legends.functions-BnY56jR_.mjs";
import { C as CATEGORY_LABELS } from "./stories.functions-BwGeYBbE.mjs";
import { u as useAuth } from "./router-5JLFb6t2.mjs";
import { g as getMyContext } from "./schools.functions-EkK2lRXY.mjs";
import "../_libs/seroval.mjs";
import "../_libs/sonner.mjs";
import { k as Trophy, B as BookOpen } from "../_libs/lucide-react.mjs";
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
import "./client-D6wJbO6y.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./auth-middleware-ovHzplJn.mjs";
import "../_libs/zod.mjs";
function Landing() {
  const {
    user
  } = useAuth();
  const fetchSnapshot = useServerFn(getHomeSnapshot);
  const fetchCtx = useServerFn(getMyContext);
  const {
    data: ctx
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCtx(),
    enabled: !!user
  });
  const activeSchoolId = ctx?.activeSchool?.id;
  const {
    data: snapshot
  } = useQuery({
    queryKey: ["home", activeSchoolId ?? "default"],
    queryFn: () => fetchSnapshot({
      data: {
        schoolId: activeSchoolId
      }
    })
  });
  const topLegends = snapshot?.topLegends ?? [];
  const trending = snapshot?.trendingStories ?? [];
  const schoolName = ctx?.activeSchool?.name ?? snapshot?.school?.name ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-paper text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, { schoolName }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "max-w-4xl mx-auto text-center px-4 mb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl md:text-7xl font-bold leading-tight mb-6", children: [
        "Every School Has",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative inline-block px-2 italic font-hand text-marker-blue", children: [
          "Legends.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 bg-marker-blue/10 -rotate-1 -z-10" })
        ] }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        "Every Student Has",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative", children: [
          "Stories.",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-1 left-0 w-full h-3 bg-highlighter/60 -z-10" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl opacity-70 mb-10 max-w-xl mx-auto font-medium", children: "Share memories, discover hilarious school moments, and vote for the greatest school legends — anonymously." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories", className: "w-full sm:w-auto px-8 py-4 bg-foreground text-background font-bold rounded-lg shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all", children: "Explore Stories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/legends", className: "w-full sm:w-auto px-8 py-4 border-2 border-ink font-bold rounded-lg hover:bg-card transition-colors", children: "Visit Legend Board" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "max-w-4xl mx-auto px-4 mb-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-2 border-ink rounded-3xl p-6 md:p-8 shadow-zine relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-4 left-6 bg-highlighter border-2 border-ink px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider rotate-[-1deg] shadow-zine-sm", children: "Quick Guide: How to Bloom 🌸" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 pt-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-xl flex items-center gap-2 text-marker-pink", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-6 h-6 shrink-0" }),
            "1. Nominate Legends"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-90 leading-relaxed font-hand text-lg", children: [
            "Spotted someone legendary? A classmate, teacher, or canteen chef who did something unforgettable? Nominate them on the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/legends", className: "underline font-bold", children: "Legend Board" }),
            " and let everyone upvote them!"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-xl flex items-center gap-2 text-amber-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-6 h-6 shrink-0" }),
            "2. Share Memories"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 leading-relaxed font-hand text-lg", children: "Post completely anonymous memories, funny classroom incidents, or test confessions." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-highlighter/10 border border-ink border-dashed p-3 rounded-xl relative rotate-[0.5deg] text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold mb-1 text-ink flex items-center gap-1", children: "Example: The Bell Prank 🔔" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-sm leading-snug text-ink/80", children: '"Someone replaced all the hallway bells with the sound of a rooster crowing. The teachers were so confused for three classes!"' })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold", children: "Trending Now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-ink/10" })
        ] }),
        trending.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyCard, { text: "No stories yet for this school. Be the first to share something legendary.", cta: {
          to: "/stories/new",
          label: "Post a story"
        } }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8", children: trending.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StoryCard, { story: s, accent: i % 2 === 0 ? "blue" : "pink" }, s.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-highlighter/20 border-2 border-ink border-dashed p-8 rounded-3xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-8 text-center rotate-[-1deg]", children: "Top Legends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: topLegends.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-hand text-center opacity-70", children: "No legends yet. Nominate the first one!" }) : topLegends.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(PodiumRow, { legend: l, rank: i + 1 }, l.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/legends/new", className: "block text-center w-full mt-8 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-sm rounded hover:scale-[1.02] transition-transform", children: "Nominate a Legend" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t-2 border-ink/10 py-12 text-center overflow-hidden whitespace-nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-12 text-4xl font-hand opacity-20 justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Class of '25 was here" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Don't eat the blue jello" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "BunkyBloom Forever" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Legendary Status Pending" })
    ] }) })
  ] });
}
function StoryCard({
  story,
  accent
}) {
  const tagColor = accent === "blue" ? "bg-marker-blue" : "bg-marker-pink";
  const cat = story.category ?? "confessions";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories/$id", params: {
    id: story.id
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-card border-2 border-ink p-6 rounded-xl shadow-zine relative hover:-translate-y-1 hover:-translate-x-1 transition-transform", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `absolute -top-3 -left-2 text-white text-xs font-bold px-2 py-1 ${tagColor} ${accent === "blue" ? "-rotate-3" : "rotate-2"}`, children: [
      "#",
      CATEGORY_LABELS[cat]?.toUpperCase() ?? cat
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start mb-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-bold", children: story.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-paper border-2 border-ink p-2 rounded-lg shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl", children: "▲" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: story.score })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-hand opacity-80 leading-relaxed line-clamp-3", children: story.body })
  ] }) });
}
function PodiumRow({
  legend,
  rank
}) {
  if (rank === 1) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-24 h-24 mx-auto mb-4 bg-card border-4 border-ink rounded-full flex items-center justify-center shadow-zine-blue text-3xl font-bold", children: "★" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-1/4 bg-marker-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-ink", children: "1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-xl", children: legend.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm italic font-hand px-4 opacity-80", children: legend.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold mt-2 text-marker-blue", children: [
        legend.score,
        " VOTES"
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 bg-card/60 p-4 rounded-xl border-2 border-ink/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold opacity-20", children: rank }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold", children: legend.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-hand opacity-70 line-clamp-1", children: legend.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm", children: legend.score })
  ] });
}
function EmptyCard({
  text,
  cta
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-2 border-dashed border-ink/30 p-8 rounded-xl text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-xl opacity-70 mb-4", children: text }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: cta.to, className: "inline-flex bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm", children: cta.label })
  ] });
}
export {
  Landing as component
};
