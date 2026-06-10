import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-iIgatL4r.mjs";
import { S as SiteNav } from "./SiteNav-Dt9k7nVg.mjs";
import { u as useAuth } from "./router-5JLFb6t2.mjs";
import { g as getMyContext, r as resolveViewSchool } from "./schools.functions-EkK2lRXY.mjs";
import { S as STORY_CATEGORIES, C as CATEGORY_LABELS, c as createStory } from "./stories.functions-BwGeYBbE.mjs";
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
import "../_libs/lucide-react.mjs";
import "./auth-middleware-ovHzplJn.mjs";
import "../_libs/zod.mjs";
function NewStoryPage() {
  const {
    user,
    loading
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchCtx = useServerFn(getMyContext);
  const fetchViewSchool = useServerFn(resolveViewSchool);
  const doCreate = useServerFn(createStory);
  const [title, setTitle] = reactExports.useState("");
  const [body, setBody] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("classroom_chaos");
  reactExports.useEffect(() => {
    if (!loading && !user) navigate({
      to: "/login"
    });
  }, [user, loading, navigate]);
  const {
    data: ctx
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCtx(),
    enabled: !!user
  });
  const activeSchoolId = ctx?.activeSchool?.id;
  const {
    data: viewSchool,
    isLoading: schoolLoading
  } = useQuery({
    queryKey: ["viewSchool", activeSchoolId ?? "default"],
    queryFn: () => fetchViewSchool({
      data: {
        schoolId: activeSchoolId
      }
    })
  });
  const schoolId = viewSchool?.school?.id;
  const create = useMutation({
    mutationFn: () => doCreate({
      data: {
        schoolId,
        title,
        body,
        category
      }
    }),
    onSuccess: async (r) => {
      await qc.invalidateQueries({
        queryKey: ["stories"]
      });
      await qc.invalidateQueries({
        queryKey: ["home"]
      });
      toast.success("Story posted!");
      navigate({
        to: "/stories"
      });
    },
    onError: (e) => toast.error(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-paper text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, { schoolName: viewSchool?.school?.name ?? ctx?.activeSchool?.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-2xl mx-auto px-4 md:px-8 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-2", children: "Share a memory" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-xl opacity-70 mb-8", children: "Anonymous. Just don't be cruel." }),
      schoolLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-xl opacity-70 text-center py-12", children: "Loading..." }) : !schoolId ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-2 border-dashed border-ink/30 p-8 rounded-xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-xl mb-4", children: "No school yet. Create one to post." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/schools", className: "bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm", children: "Add a school" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        create.mutate();
      }, className: "bg-card border-2 border-ink rounded-xl p-6 shadow-zine space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { maxLength: 140, value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Title", className: "w-full px-3 py-3 border-2 border-ink rounded bg-paper text-lg font-bold focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: category, onChange: (e) => setCategory(e.target.value), className: "w-full px-3 py-3 border-2 border-ink rounded bg-paper font-bold", children: STORY_CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: CATEGORY_LABELS[c] }, c)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { maxLength: 5e3, rows: 8, value: body, onChange: (e) => setBody(e.target.value), placeholder: "Tell the story...", className: "w-full px-3 py-3 border-2 border-ink rounded bg-paper font-hand text-lg focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: create.isPending, className: "w-full py-3 bg-foreground text-background font-bold rounded shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50", children: create.isPending ? "Posting..." : "Post anonymously" })
      ] })
    ] })
  ] });
}
export {
  NewStoryPage as component
};
