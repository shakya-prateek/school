import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-iIgatL4r.mjs";
import { D as DeleteOwnContentButton } from "./DeleteOwnContentButton-B7xUpLVM.mjs";
import { S as SiteNav } from "./SiteNav-Dt9k7nVg.mjs";
import { u as useAuth } from "./router-5JLFb6t2.mjs";
import { g as getMyContext, r as resolveViewSchool } from "./schools.functions-EkK2lRXY.mjs";
import { v as voteLegend, d as deleteLegend, l as listLegends } from "./legends.functions-BnY56jR_.mjs";
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
function LegendsPage() {
  const {
    user
  } = useAuth();
  const qc = useQueryClient();
  const fetchCtx = useServerFn(getMyContext);
  const fetchViewSchool = useServerFn(resolveViewSchool);
  const fetchLegends = useServerFn(listLegends);
  const doVote = useServerFn(voteLegend);
  const doDelete = useServerFn(deleteLegend);
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
    queryKey: ["legends", schoolId],
    queryFn: () => fetchLegends({
      data: {
        schoolId
      }
    }),
    enabled: !!schoolId
  });
  const vote = useMutation({
    mutationFn: (id) => doVote({
      data: {
        legendId: id,
        on: true
      }
    }),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["legends", schoolId]
    }),
    onError: (e) => toast.error(e.message)
  });
  const remove = useMutation({
    mutationFn: (legendId) => doDelete({
      data: {
        id: legendId
      }
    }),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ["legends", schoolId]
      });
      await qc.invalidateQueries({
        queryKey: ["home"]
      });
      toast.success("Legend removed");
    },
    onError: (e) => toast.error(e.message)
  });
  const legends = data?.legends ?? [];
  const top3 = legends.slice(0, 3);
  const rest = legends.slice(3);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-paper text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, { schoolName }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-5xl mx-auto px-4 md:px-8 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between flex-wrap gap-4 mb-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl md:text-5xl font-bold", children: "Legend Board" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-xl opacity-70", children: "The hallway hall of fame." })
        ] }),
        schoolId && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/legends/new", className: "bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all", children: "+ Nominate" })
      ] }),
      !schoolId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-2 border-dashed border-ink/30 p-12 rounded-xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-2xl opacity-70 mb-4", children: "No schools yet. Create one to get started." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/schools", className: "bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm", children: "Add a school" })
      ] }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-red-600 font-hand text-xl py-16", children: error.message }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        top3.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-16", children: [1, 0, 2].map((idx, i) => {
          const l = top3[idx];
          if (!l) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, i);
          const heights = ["h-64", "h-48", "h-40"];
          const colors = ["bg-highlighter text-ink", "bg-marker-blue text-white", "bg-marker-pink text-white"];
          const orderClasses = ["order-1 md:order-2", "order-2 md:order-1", "order-3 md:order-3"];
          const rank = idx + 1;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-center ${orderClasses[idx]}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-card border-2 border-ink rounded-xl p-6 shadow-zine ${rank === 1 ? "md:scale-105 relative z-10" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-12 h-12 ${colors[idx]} rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-xl border-2 border-ink`, children: rank }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-xl mb-2", children: l.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-base opacity-80 line-clamp-3", children: l.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-bold mt-3 text-marker-blue", children: [
                l.score,
                " VOTES"
              ] }),
              user && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => vote.mutate(l.id), className: "mt-3 text-xs font-bold underline opacity-70 hover:opacity-100", children: "▲ Vote" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${heights[idx]} ${colors[idx].split(" ")[0]} border-2 border-ink border-t-0 rounded-b-xl opacity-40` }),
            user?.id === l.author_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteOwnContentButton, { kind: "legend", isPending: remove.isPending, onConfirm: () => remove.mutate(l.id) }) })
          ] }, l.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          rest.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 bg-card border-2 border-ink rounded-lg p-4 shadow-zine-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold opacity-30 w-8", children: i + 4 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold", children: l.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-hand opacity-70", children: l.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-paper border-2 border-ink px-3 py-2 rounded-lg shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1 select-none", children: "Vote" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => user ? vote.mutate(l.id) : toast.error("Sign in to vote"), className: "text-xl hover:text-marker-blue cursor-pointer transition-colors", title: "Vote", children: "▲" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-sm mt-1", children: l.score })
              ] })
            ] }),
            user?.id === l.author_id && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteOwnContentButton, { kind: "legend", isPending: remove.isPending, onConfirm: () => remove.mutate(l.id) }) })
          ] }, l.id)),
          legends.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center opacity-50 font-hand text-xl py-16", children: "No legends yet. Nominate the first one!" })
        ] })
      ] })
    ] })
  ] });
}
export {
  LegendsPage as component
};
