import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-iIgatL4r.mjs";
import { u as useAuth } from "./router-5JLFb6t2.mjs";
import { b as createServerFn } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
import { r as requireAdmin } from "./admin-middleware-CA7tFpqM.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { T as Terminal, h as ShieldAlert, a as ArrowRight, A as Activity, M as Mail, E as ExternalLink, U as Users, D as Database, P as Play, B as BookOpen, e as MessageSquare, k as Trophy, c as Cpu, g as Server, f as Search, R as RefreshCw, S as School, C as Calendar, j as Trash2 } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
const checkIsAdmin = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("d7ab752d5c5280d2ee84a9875749b1cba0d95c7bbe892baa67e4f3368bfac36c"));
const adminGetModerationQueue = createServerFn({
  method: "POST"
}).middleware([requireAdmin]).handler(createSsrRpc("0f199937ba96634e4df620d8ae98cc89f9b9877b1f31e84b7cb4d658adae2772"));
const adminDeleteStory = createServerFn({
  method: "POST"
}).middleware([requireAdmin]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("6bce6d596230d9b3628aa40aa934a3e7427808cc0545d6f26f959c5c762fe502"));
const adminDeleteComment = createServerFn({
  method: "POST"
}).middleware([requireAdmin]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("6db5b19256028e899bf7983d6f88dd59c4706a4416ab35c9dfd77daf135aa118"));
const adminDeleteLegend = createServerFn({
  method: "POST"
}).middleware([requireAdmin]).inputValidator((d) => objectType({
  id: stringType().uuid()
}).parse(d)).handler(createSsrRpc("fbf83f098b899728d5fd93272579e99417eabf8577eb5e65ee7857e4933b27dc"));
function AdminDashboard() {
  const {
    user,
    loading: authLoading
  } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = reactExports.useState("users");
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [sysLogs, setSysLogs] = reactExports.useState([]);
  const consoleEndRef = reactExports.useRef(null);
  const checkAdmin = useServerFn(checkIsAdmin);
  const getQueue = useServerFn(adminGetModerationQueue);
  const deleteStoryFn = useServerFn(adminDeleteStory);
  const deleteCommentFn = useServerFn(adminDeleteComment);
  const deleteLegendFn = useServerFn(adminDeleteLegend);
  const {
    data: adminCheck,
    isLoading: checkLoading
  } = useQuery({
    queryKey: ["admin-check"],
    queryFn: () => checkAdmin(),
    enabled: !!user
  });
  const {
    data: queue,
    isLoading: queueLoading,
    refetch
  } = useQuery({
    queryKey: ["admin-queue"],
    queryFn: () => getQueue(),
    enabled: !!adminCheck?.isAdmin
  });
  const deleteStoryMutation = useMutation({
    mutationFn: (id2) => deleteStoryFn({
      data: {
        id: id2
      }
    }),
    onSuccess: () => {
      toast.success("Memory purged from secure database.");
      refetch();
      addLog(`[SUCCESS] Story ${id.substring(0, 8)}... permanently deleted.`);
    },
    onError: (err) => {
      toast.error(err.message);
      addLog(`[ERROR] Failed to delete story ${id.substring(0, 8)}...: ${err.message}`);
    }
  });
  const deleteCommentMutation = useMutation({
    mutationFn: (id2) => deleteCommentFn({
      data: {
        id: id2
      }
    }),
    onSuccess: () => {
      toast.success("Comment deleted successfully.");
      refetch();
      addLog(`[SUCCESS] Comment ${id.substring(0, 8)}... deleted.`);
    },
    onError: (err) => {
      toast.error(err.message);
      addLog(`[ERROR] Failed to delete comment: ${err.message}`);
    }
  });
  const deleteLegendMutation = useMutation({
    mutationFn: (id2) => deleteLegendFn({
      data: {
        id: id2
      }
    }),
    onSuccess: () => {
      toast.success("Nominated Legend removed.");
      refetch();
      addLog(`[SUCCESS] Legend ${id.substring(0, 8)}... purged.`);
    },
    onError: (err) => {
      toast.error(err.message);
      addLog(`[ERROR] Failed to purge legend entry: ${err.message}`);
    }
  });
  const addLog = (text) => {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    setSysLogs((prev) => [...prev.slice(-30), `[${timestamp}] ${text}`]);
  };
  reactExports.useEffect(() => {
    consoleEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [sysLogs]);
  reactExports.useEffect(() => {
    if (queue) {
      const initLogs = [`Establishing secure shell connection to remote campus server...`, `Handshake completed. Protocol: SSL/Supabase_WSS.`, `Validating active session credentials for: ${user?.email}`, `Decryption successful. ADMIN_CLEARANCE: LEVEL_5 (Full Root Access).`, `Synchronizing database partitions...`, `Loaded ${queue.users?.length || 0} user profile directories.`, `Indexed ${queue.stories?.length || 0} confessions, ${queue.comments?.length || 0} comments, and ${queue.legends?.length || 0} legends.`, `SYS_MONITOR: Standing by for instructions.`];
      let index = 0;
      setSysLogs([]);
      const interval = setInterval(() => {
        if (index < initLogs.length) {
          addLog(initLogs[index]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 450);
      return () => clearInterval(interval);
    }
  }, [queue, user]);
  reactExports.useEffect(() => {
    if (!authLoading && !user) {
      navigate({
        to: "/login"
      });
    }
  }, [user, authLoading, navigate]);
  if (authLoading || checkLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#070b13] text-cyan-400 flex items-center justify-center font-mono p-6 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.4)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full border border-cyan-500/30 bg-slate-900/80 p-8 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.15)] relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-6 h-6 text-cyan-400 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold uppercase tracking-wider text-slate-400 border-r border-slate-700 pr-3", children: "BB_SYS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/20 rounded", children: "Init" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 font-bold", children: ">" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "CONNECTING_TO_HOST..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-500 font-bold", children: ">" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AUTHENTICATING_CREDENTIALS..." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2.5 h-4 bg-cyan-400 animate-pulse inline-block" })
          ] })
        ] })
      ] })
    ] });
  }
  if (!user || !adminCheck?.isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#0d070b] text-rose-400 flex items-center justify-center font-mono p-4 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-radial-[at_50%_50%,rgba(244,63,94,0.06)_0%,transparent_70%] pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg w-full border border-rose-500/40 bg-slate-950/90 p-8 rounded-lg shadow-[0_0_40px_rgba(244,63,94,0.2)] text-center relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 flex items-center gap-1.5 bg-rose-950/60 border border-rose-800 text-rose-500 px-3 py-1 rounded text-xs font-bold uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-3.5 h-3.5 animate-flash" }),
          "SECURE_LOCKOUT"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-20 h-20 text-rose-500 mx-auto mb-6 animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold uppercase tracking-wider mb-2 text-rose-500", children: "INTRUDER_DETECTED" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs border border-rose-950 bg-rose-950/20 p-3 rounded font-mono text-left mb-6 text-rose-300 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "ACCESS_REQUEST: DENIED" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "ATTEMPT_LOGGED_FROM: ",
            user?.email
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "STATUS: SECURITY_SHIELD_ACTIVE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-slate-400 mb-8", children: "This node is locked to authorized agents. Return to safe campus space." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-3 rounded border border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all cursor-pointer", children: [
          "Exit Terminal ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] })
      ] })
    ] });
  }
  const rawUsers = queue?.users ?? [];
  const rawStories = queue?.stories ?? [];
  const rawComments = queue?.comments ?? [];
  const rawLegends = queue?.legends ?? [];
  const query = searchQuery.toLowerCase().trim();
  const users = rawUsers.filter((u) => u.display_handle?.toLowerCase().includes(query) || u.email?.toLowerCase().includes(query) || u.active_school?.toLowerCase().includes(query) || u.id?.toLowerCase().includes(query));
  const stories = rawStories.filter((s) => s.title?.toLowerCase().includes(query) || s.body?.toLowerCase().includes(query) || s.author_handle?.toLowerCase().includes(query) || s.author_email?.toLowerCase().includes(query) || s.schools?.name?.toLowerCase().includes(query) || s.category?.toLowerCase().includes(query));
  const comments = rawComments.filter((c) => c.body?.toLowerCase().includes(query) || c.author_handle?.toLowerCase().includes(query) || c.author_email?.toLowerCase().includes(query) || c.stories?.title?.toLowerCase().includes(query));
  const legends = rawLegends.filter((l) => l.name?.toLowerCase().includes(query) || l.description?.toLowerCase().includes(query) || l.author_handle?.toLowerCase().includes(query) || l.author_email?.toLowerCase().includes(query) || l.schools?.name?.toLowerCase().includes(query));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#080b11] text-slate-200 font-mono relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.4)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-96 bg-radial-[at_50%_0%,rgba(6,182,212,0.07)_0%,transparent_60%] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-cyan-950/50 border border-cyan-500/30 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.2)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-5 h-5 text-cyan-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-black tracking-wider text-slate-100 uppercase", children: "BunkyBloom Monitor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold bg-cyan-950 text-cyan-400 px-2 py-0.5 border border-cyan-500/30 rounded", children: "ROOT" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-slate-400 tracking-wider", children: "HOST_SHIELD: LEVEL_5 // DB_SSL: ACTIVE" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 text-emerald-400 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "SYS_STATUS:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400 font-bold uppercase", children: "ONLINE" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-400", children: "ADMIN:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-cyan-400 font-semibold", children: user?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 px-3 py-1.5 rounded-lg transition-all", children: [
          "Exit Console ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-3.5 h-3.5" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/80 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-16 h-16 text-cyan-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3.5 h-3.5 text-cyan-400" }),
            "Db: users_directory"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-cyan-400 tracking-tight", children: rawUsers.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-2.5 h-2.5 text-cyan-400" }),
            " Query returned ",
            users.length,
            " matches"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/80 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-16 h-16 text-emerald-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-3.5 h-3.5 text-emerald-400" }),
            "Db: story_index"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-emerald-400 tracking-tight", children: rawStories.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-2.5 h-2.5 text-emerald-400" }),
            " Query returned ",
            stories.length,
            " matches"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/80 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-rose-500/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-16 h-16 text-rose-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-3.5 h-3.5 text-rose-400" }),
            "Db: comments_table"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-rose-400 tracking-tight", children: rawComments.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-2.5 h-2.5 text-rose-400" }),
            " Query returned ",
            comments.length,
            " matches"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-slate-950/80 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/30 transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-16 h-16 text-amber-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3.5 h-3.5 text-amber-400" }),
            "Db: legends_hall"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl font-extrabold text-amber-400 tracking-tight", children: rawLegends.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-2.5 h-2.5 text-amber-400" }),
            " Query returned ",
            legends.length,
            " matches"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 border-b border-slate-900 pb-2 text-xs font-bold text-slate-400 uppercase", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-4 h-4 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Diagnostic System Shell" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 border border-emerald-500/20 rounded font-mono", children: "handshake_ok" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-28 overflow-y-auto font-mono text-[11px] text-cyan-500/90 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pr-2 leading-relaxed bg-[#05070a] p-3 rounded border border-slate-900", children: [
          sysLogs.map((log, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 select-none", children: ">" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: log.includes("[ERROR]") ? "text-rose-400" : log.includes("[SUCCESS]") ? "text-emerald-400" : "text-cyan-400", children: log })
          ] }, index)),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: consoleEndRef })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-slate-950/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-slate-800 bg-slate-950/50 flex flex-col md:flex-row md:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-slate-300", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { className: "w-4.5 h-4.5 text-cyan-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Db Control Desk" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full md:max-w-md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", placeholder: "EXECUTE SEARCH QUERY (email, handle, content...)", value: searchQuery, onChange: (e) => {
              setSearchQuery(e.target.value);
              if (e.target.value.trim() !== "") {
                addLog(`FILTER: Applying active filter string: "${e.target.value}"`);
              }
            }, className: "w-full pl-10 pr-4 py-2 text-xs font-mono bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all uppercase" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap border-b border-slate-800/80 bg-slate-950/20 px-4 pt-4 gap-1", children: [{
          id: "users",
          label: "01. SIGNUPS",
          count: users.length,
          icon: Users,
          glow: "text-cyan-400 border-cyan-500/40 bg-cyan-950/10"
        }, {
          id: "stories",
          label: "02. STORIES",
          count: stories.length,
          icon: BookOpen,
          glow: "text-emerald-400 border-emerald-500/40 bg-emerald-950/10"
        }, {
          id: "comments",
          label: "03. COMMENTS",
          count: comments.length,
          icon: MessageSquare,
          glow: "text-rose-400 border-rose-500/40 bg-rose-950/10"
        }, {
          id: "legends",
          label: "04. LEGENDS",
          count: legends.length,
          icon: Trophy,
          glow: "text-amber-400 border-amber-500/40 bg-amber-950/10"
        }].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
            setActiveTab(tab.id);
            addLog(`COMMAND: Transferred interface view to: ${tab.id.toUpperCase()}`);
          }, className: `flex items-center gap-2.5 px-5 py-3 border-t border-x border-transparent rounded-t-lg text-xs font-bold transition-all duration-150 cursor-pointer ${isActive ? `${tab.glow} border-slate-800 border-b-[#080b11] translate-y-[1px] font-black` : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/40 border-b border-transparent"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tab.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-mono px-1.5 py-0.2 rounded border ${isActive ? "border-cyan-500/20 bg-slate-900" : "border-slate-800 opacity-60"}`, children: tab.count })
          ] }, tab.id);
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6", children: queueLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-slate-500 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-8 h-8 animate-spin text-cyan-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold uppercase tracking-wider animate-pulse", children: "Syncing data shards..." })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
          activeTab === "users" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40 shadow-inner", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full border-collapse text-left text-xs font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4", children: "Display Handle" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4", children: "Active School" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4", children: "Date Joined" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-6 py-4", children: "System ID" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { className: "divide-y divide-slate-800/50", children: [
              users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-slate-900/40 transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 font-bold text-slate-200", children: u.display_handle }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 text-cyan-400 font-semibold flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5 text-cyan-400/60" }),
                  u.email ?? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-rose-400/70 italic text-[10px]", children: "ERR_NO_SERVICE_KEY_FALLBACK" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4", children: u.active_school ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "w-3 h-3 text-cyan-400" }),
                  u.active_school
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-600 italic", children: "Unassigned" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-4 text-slate-400 flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5 text-slate-500" }),
                  new Date(u.created_at).toLocaleDateString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-4 text-[10px] text-slate-600 font-mono tracking-tight", children: u.id })
              ] }, u.id)),
              users.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "text-center py-12 text-slate-600 font-mono", children: "NO_RECORDS_MATCH_ACTIVE_FILTER" }) })
            ] })
          ] }) }) }),
          activeTab === "stories" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
            stories.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-slate-950/50 border border-slate-800 hover:border-emerald-500/20 p-5 rounded-xl transition-all shadow-md relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase", children: [
                    "#",
                    s.category
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-200 tracking-tight", children: s.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "w-3.5 h-3.5 text-cyan-400/80" }),
                    s.schools?.name ?? "No school reference"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                  if (confirm("Are you sure you want to permanently delete this story entry?")) {
                    deleteStoryMutation.mutate(s.id);
                  }
                }, disabled: deleteStoryMutation.isPending, className: "bg-rose-950/20 text-rose-400 hover:text-slate-100 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-400 p-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider", title: "Delete Confession", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Purge" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-slate-400 bg-slate-900/60 p-4 border border-slate-900 rounded-lg whitespace-pre-wrap mb-4 font-mono", children: s.body }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-slate-400 font-bold border-t border-slate-900/80 pt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "AUTHOR_HANDLE: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-200 font-semibold", children: s.author_handle })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cyan-400 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 text-cyan-400/60" }),
                  s.author_email ?? "UNAVAILABLE_SECRET"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-500 font-mono", children: [
                  "TIMESTAMP: ",
                  new Date(s.created_at).toLocaleString()
                ] })
              ] })
            ] }, s.id)),
            stories.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-slate-600 font-mono", children: "NO_STORIES_FOUND_MATCHING_FILTER" })
          ] }),
          activeTab === "comments" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
            comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-slate-950/50 border border-slate-800 hover:border-rose-500/20 p-5 rounded-xl transition-all shadow-md relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded uppercase", children: "comment_record" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500", children: [
                    "Linked Post: ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-300 font-bold underline", children: c.stories?.title ?? "Unknown post" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                  if (confirm("Are you sure you want to delete this comment?")) {
                    deleteCommentMutation.mutate(c.id);
                  }
                }, disabled: deleteCommentMutation.isPending, className: "bg-rose-950/20 text-rose-400 hover:text-slate-100 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-400 p-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider", title: "Delete Comment", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Purge" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs leading-relaxed text-slate-400 bg-slate-900/60 p-3.5 border border-slate-900 rounded-lg mb-4 font-mono", children: [
                '"',
                c.body,
                '"'
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-slate-400 font-bold border-t border-slate-900/80 pt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "COMMENTER: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-200 font-semibold", children: c.author_handle })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cyan-400 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 text-cyan-400/60" }),
                  c.author_email ?? "UNAVAILABLE_SECRET"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-500 font-mono", children: [
                  "TIMESTAMP: ",
                  new Date(c.created_at).toLocaleString()
                ] })
              ] })
            ] }, c.id)),
            comments.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-slate-600 font-mono", children: "NO_COMMENTS_FOUND_MATCHING_FILTER" })
          ] }),
          activeTab === "legends" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4", children: [
            legends.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-slate-950/50 border border-slate-800 hover:border-amber-500/20 p-5 rounded-xl transition-all shadow-md relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded uppercase flex items-center gap-1 w-fit", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3 h-3 text-amber-400" }),
                    "nominated_legend"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-bold text-slate-200 tracking-tight", children: l.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-slate-500 flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "w-3.5 h-3.5 text-cyan-400/80" }),
                    l.schools?.name ?? "No school reference"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
                  if (confirm("Are you sure you want to remove this nominated legend?")) {
                    deleteLegendMutation.mutate(l.id);
                  }
                }, disabled: deleteLegendMutation.isPending, className: "bg-rose-950/20 text-rose-400 hover:text-slate-100 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-400 p-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider", title: "Remove Legend", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Purge" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-slate-400 bg-slate-900/60 p-4 border border-slate-900 rounded-lg whitespace-pre-wrap mb-4 font-mono", children: l.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-slate-400 font-bold border-t border-slate-900/80 pt-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  "NOMINATOR: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-slate-200 font-semibold", children: l.author_handle })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-cyan-400 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3 h-3 text-cyan-400/60" }),
                  l.author_email ?? "UNAVAILABLE_SECRET"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-slate-500 font-mono", children: [
                  "TIMESTAMP: ",
                  new Date(l.created_at).toLocaleString()
                ] })
              ] })
            ] }, l.id)),
            legends.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-16 text-slate-600 font-mono", children: "NO_LEGENDS_FOUND_MATCHING_FILTER" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] z-50 opacity-15" })
  ] });
}
export {
  AdminDashboard as component
};
