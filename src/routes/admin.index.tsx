import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/auth-context";
import {
  checkIsAdmin,
  adminGetModerationQueue,
  adminDeleteStory,
  adminDeleteComment,
  adminDeleteLegend,
} from "@/lib/admin.functions";
import { toast } from "sonner";
import { 
  ShieldAlert, Users, BookOpen, MessageSquare, Trophy, 
  Trash2, ShieldCheck, Mail, Calendar, School, Terminal,
  Activity, Cpu, Database, RefreshCw, Search, ArrowRight,
  ExternalLink, Play, Server, AlertCircle
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "BunkyBloom Terminal — Admin Console" }] }),
  component: AdminDashboard,
});

type TabType = "users" | "stories" | "comments" | "legends";

function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("users");
  const [searchQuery, setSearchQuery] = useState("");
  const [sysLogs, setSysLogs] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const checkAdmin = useServerFn(checkIsAdmin);
  const getQueue = useServerFn(adminGetModerationQueue);
  const deleteStoryFn = useServerFn(adminDeleteStory);
  const deleteCommentFn = useServerFn(adminDeleteComment);
  const deleteLegendFn = useServerFn(adminDeleteLegend);

  // Check admin authorization
  const { data: adminCheck, isLoading: checkLoading } = useQuery({
    queryKey: ["admin-check"],
    queryFn: () => checkAdmin(),
    enabled: !!user,
  });

  // Fetch admin queue data
  const { data: queue, isLoading: queueLoading, refetch } = useQuery({
    queryKey: ["admin-queue"],
    queryFn: () => getQueue(),
    enabled: !!adminCheck?.isAdmin,
  });

  const deleteStoryMutation = useMutation({
    mutationFn: (id: string) => deleteStoryFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Memory purged from secure database.");
      refetch();
      addLog(`[SUCCESS] Story ${id.substring(0, 8)}... permanently deleted.`);
    },
    onError: (err: any) => {
      toast.error(err.message);
      addLog(`[ERROR] Failed to delete story ${id.substring(0, 8)}...: ${err.message}`);
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: string) => deleteCommentFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Comment deleted successfully.");
      refetch();
      addLog(`[SUCCESS] Comment ${id.substring(0, 8)}... deleted.`);
    },
    onError: (err: any) => {
      toast.error(err.message);
      addLog(`[ERROR] Failed to delete comment: ${err.message}`);
    },
  });

  const deleteLegendMutation = useMutation({
    mutationFn: (id: string) => deleteLegendFn({ data: { id } }),
    onSuccess: () => {
      toast.success("Nominated Legend removed.");
      refetch();
      addLog(`[SUCCESS] Legend ${id.substring(0, 8)}... purged.`);
    },
    onError: (err: any) => {
      toast.error(err.message);
      addLog(`[ERROR] Failed to purge legend entry: ${err.message}`);
    },
  });

  // Helper to append log lines
  const addLog = (text: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setSysLogs(prev => [...prev.slice(-30), `[${timestamp}] ${text}`]);
  };

  // Auto-scroll logs terminal
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sysLogs]);

  // Initial log sequence
  useEffect(() => {
    if (queue) {
      const initLogs = [
        `Establishing secure shell connection to remote campus server...`,
        `Handshake completed. Protocol: SSL/Supabase_WSS.`,
        `Validating active session credentials for: ${user?.email}`,
        `Decryption successful. ADMIN_CLEARANCE: LEVEL_5 (Full Root Access).`,
        `Synchronizing database partitions...`,
        `Loaded ${queue.users?.length || 0} user profile directories.`,
        `Indexed ${queue.stories?.length || 0} confessions, ${queue.comments?.length || 0} comments, and ${queue.legends?.length || 0} legends.`,
        `SYS_MONITOR: Standing by for instructions.`
      ];
      
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

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/login" });
    }
  }, [user, authLoading, navigate]);

  // Booting / loading animation screen
  if (authLoading || checkLoading) {
    return (
      <div className="min-h-screen bg-[#070b13] text-cyan-400 flex items-center justify-center font-mono p-6 relative overflow-hidden">
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.4)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="max-w-md w-full border border-cyan-500/30 bg-slate-900/80 p-8 rounded-lg shadow-[0_0_30px_rgba(6,182,212,0.15)] relative">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-cyan-400 animate-pulse" />
            <div className="text-sm font-bold uppercase tracking-wider text-slate-400 border-r border-slate-700 pr-3">BB_SYS</div>
            <div className="text-xs uppercase text-emerald-400 bg-emerald-950/40 px-2 py-0.5 border border-emerald-500/20 rounded">Init</div>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold">&gt;</span>
              <span>CONNECTING_TO_HOST...</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-bold">&gt;</span>
              <span>AUTHENTICATING_CREDENTIALS...</span>
              <span className="w-2.5 h-4 bg-cyan-400 animate-pulse inline-block" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Intruder/Access Denied Screen
  if (!user || !adminCheck?.isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d070b] text-rose-400 flex items-center justify-center font-mono p-4 relative overflow-hidden">
        {/* Neon warning background */}
        <div className="absolute inset-0 bg-radial-[at_50%_50%,rgba(244,63,94,0.06)_0%,transparent_70%] pointer-events-none" />
        <div className="max-w-lg w-full border border-rose-500/40 bg-slate-950/90 p-8 rounded-lg shadow-[0_0_40px_rgba(244,63,94,0.2)] text-center relative">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 bg-rose-950/60 border border-rose-800 text-rose-500 px-3 py-1 rounded text-xs font-bold uppercase">
            <ShieldAlert className="w-3.5 h-3.5 animate-flash" />
            SECURE_LOCKOUT
          </div>
          
          <ShieldAlert className="w-20 h-20 text-rose-500 mx-auto mb-6 animate-pulse" />
          <h1 className="text-3xl font-extrabold uppercase tracking-wider mb-2 text-rose-500">INTRUDER_DETECTED</h1>
          <div className="text-xs border border-rose-950 bg-rose-950/20 p-3 rounded font-mono text-left mb-6 text-rose-300 space-y-1">
            <p>ACCESS_REQUEST: DENIED</p>
            <p>ATTEMPT_LOGGED_FROM: {user?.email}</p>
            <p>STATUS: SECURITY_SHIELD_ACTIVE</p>
          </div>
          <p className="text-sm text-slate-400 mb-8">
            This node is locked to authorized agents. Return to safe campus space.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-3 rounded border border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all cursor-pointer"
          >
            Exit Terminal <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // Filter lists based on search query
  const rawUsers = queue?.users ?? [];
  const rawStories = queue?.stories ?? [];
  const rawComments = queue?.comments ?? [];
  const rawLegends = queue?.legends ?? [];

  const query = searchQuery.toLowerCase().trim();

  const users = rawUsers.filter(u => 
    u.display_handle?.toLowerCase().includes(query) ||
    u.email?.toLowerCase().includes(query) ||
    u.active_school?.toLowerCase().includes(query) ||
    u.id?.toLowerCase().includes(query)
  );

  const stories = rawStories.filter(s => 
    s.title?.toLowerCase().includes(query) ||
    s.body?.toLowerCase().includes(query) ||
    s.author_handle?.toLowerCase().includes(query) ||
    s.author_email?.toLowerCase().includes(query) ||
    s.schools?.name?.toLowerCase().includes(query) ||
    s.category?.toLowerCase().includes(query)
  );

  const comments = rawComments.filter(c => 
    c.body?.toLowerCase().includes(query) ||
    c.author_handle?.toLowerCase().includes(query) ||
    c.author_email?.toLowerCase().includes(query) ||
    c.stories?.title?.toLowerCase().includes(query)
  );

  const legends = rawLegends.filter(l => 
    l.name?.toLowerCase().includes(query) ||
    l.description?.toLowerCase().includes(query) ||
    l.author_handle?.toLowerCase().includes(query) ||
    l.author_email?.toLowerCase().includes(query) ||
    l.schools?.name?.toLowerCase().includes(query)
  );

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-200 font-mono relative overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
      {/* Cyber Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.4)_1px,transparent_1px),linear-gradient(90deg,rgba(18,24,38,0.4)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-96 bg-radial-[at_50%_0%,rgba(6,182,212,0.07)_0%,transparent_60%] pointer-events-none" />

      {/* Cyber Header Bar */}
      <header className="border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-950/50 border border-cyan-500/30 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-wider text-slate-100 uppercase">BunkyBloom Monitor</span>
                <span className="text-[10px] font-bold bg-cyan-950 text-cyan-400 px-2 py-0.5 border border-cyan-500/30 rounded">ROOT</span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider">HOST_SHIELD: LEVEL_5 // DB_SSL: ACTIVE</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-slate-400">SYS_STATUS:</span>
              <span className="text-emerald-400 font-bold uppercase">ONLINE</span>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">ADMIN:</span>
              <span className="text-cyan-400 font-semibold">{user?.email}</span>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/30 px-3 py-1.5 rounded-lg transition-all"
            >
              Exit Console <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
        {/* STATS WIDGET GRID */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* USER STAT */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-cyan-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-16 h-16 text-cyan-400" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              Db: users_directory
            </div>
            <div className="text-3xl font-extrabold text-cyan-400 tracking-tight">{rawUsers.length}</div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1">
              <Play className="w-2.5 h-2.5 text-cyan-400" /> Query returned {users.length} matches
            </p>
          </div>

          {/* CONFESSIONS STAT */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <BookOpen className="w-16 h-16 text-emerald-400" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              Db: story_index
            </div>
            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">{rawStories.length}</div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1">
              <Play className="w-2.5 h-2.5 text-emerald-400" /> Query returned {stories.length} matches
            </p>
          </div>

          {/* COMMENTS STAT */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-rose-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <MessageSquare className="w-16 h-16 text-rose-400" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">
              <MessageSquare className="w-3.5 h-3.5 text-rose-400" />
              Db: comments_table
            </div>
            <div className="text-3xl font-extrabold text-rose-400 tracking-tight">{rawComments.length}</div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1">
              <Play className="w-2.5 h-2.5 text-rose-400" /> Query returned {comments.length} matches
            </p>
          </div>

          {/* LEGENDS STAT */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden group hover:border-amber-500/30 transition-colors">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <Trophy className="w-16 h-16 text-amber-400" />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider mb-2 font-bold">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Db: legends_hall
            </div>
            <div className="text-3xl font-extrabold text-amber-400 tracking-tight">{rawLegends.length}</div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1">
              <Play className="w-2.5 h-2.5 text-amber-400" /> Query returned {legends.length} matches
            </p>
          </div>
        </section>

        {/* TERMINAL DIAGNOSTIC FEED */}
        <section className="bg-slate-950 border border-slate-800 rounded-xl p-4 shadow-2xl relative">
          <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2 text-xs font-bold text-slate-400 uppercase">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Diagnostic System Shell</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-950/30 px-2 py-0.5 border border-emerald-500/20 rounded font-mono">
              handshake_ok
            </span>
          </div>
          
          <div className="h-28 overflow-y-auto font-mono text-[11px] text-cyan-500/90 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pr-2 leading-relaxed bg-[#05070a] p-3 rounded border border-slate-900">
            {sysLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-1">
                <span className="text-slate-600 select-none">&gt;</span>
                <span className={log.includes("[ERROR]") ? "text-rose-400" : log.includes("[SUCCESS]") ? "text-emerald-400" : "text-cyan-400"}>
                  {log}
                </span>
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
        </section>

        {/* CONTROL OPERATIONS CENTER */}
        <section className="bg-slate-950/80 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          {/* SEARCH & FILTERS BAR */}
          <div className="p-6 border-b border-slate-800 bg-slate-950/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Action title */}
            <div className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wider text-slate-300">
              <Server className="w-4.5 h-4.5 text-cyan-400" />
              <span>Db Control Desk</span>
            </div>

            {/* Console Input Query bar */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-500" />
              <input
                type="text"
                placeholder="EXECUTE SEARCH QUERY (email, handle, content...)"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim() !== "") {
                    addLog(`FILTER: Applying active filter string: "${e.target.value}"`);
                  }
                }}
                className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-slate-900 border border-slate-800 focus:border-cyan-500 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all uppercase"
              />
            </div>
          </div>

          {/* TAB CONSOLE SWITCH */}
          <div className="flex flex-wrap border-b border-slate-800/80 bg-slate-950/20 px-4 pt-4 gap-1">
            {[
              { id: "users", label: "01. SIGNUPS", count: users.length, icon: Users, glow: "text-cyan-400 border-cyan-500/40 bg-cyan-950/10" },
              { id: "stories", label: "02. STORIES", count: stories.length, icon: BookOpen, glow: "text-emerald-400 border-emerald-500/40 bg-emerald-950/10" },
              { id: "comments", label: "03. COMMENTS", count: comments.length, icon: MessageSquare, glow: "text-rose-400 border-rose-500/40 bg-rose-950/10" },
              { id: "legends", label: "04. LEGENDS", count: legends.length, icon: Trophy, glow: "text-amber-400 border-amber-500/40 bg-amber-950/10" },
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as TabType);
                    addLog(`COMMAND: Transferred interface view to: ${tab.id.toUpperCase()}`);
                  }}
                  className={`flex items-center gap-2.5 px-5 py-3 border-t border-x border-transparent rounded-t-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? `${tab.glow} border-slate-800 border-b-[#080b11] translate-y-[1px] font-black`
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-900/40 border-b border-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                    isActive ? "border-cyan-500/20 bg-slate-900" : "border-slate-800 opacity-60"
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TAB SHEETS */}
          <div className="p-6">
            {queueLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
                <RefreshCw className="w-8 h-8 animate-spin text-cyan-400" />
                <p className="text-sm font-bold uppercase tracking-wider animate-pulse">Syncing data shards...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 1. SIGNUPS LIST SHEET */}
                {activeTab === "users" && (
                  <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-slate-950/40 shadow-inner">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left text-xs font-mono">
                        <thead>
                          <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="px-6 py-4">Display Handle</th>
                            <th className="px-6 py-4">Email Address</th>
                            <th className="px-6 py-4">Active School</th>
                            <th className="px-6 py-4">Date Joined</th>
                            <th className="px-6 py-4">System ID</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                          {users.map((u: any) => (
                            <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                              <td className="px-6 py-4 font-bold text-slate-200">{u.display_handle}</td>
                              <td className="px-6 py-4 text-cyan-400 font-semibold flex items-center gap-2">
                                <Mail className="w-3.5 h-3.5 text-cyan-400/60" />
                                {u.email ?? (
                                  <span className="text-rose-400/70 italic text-[10px]">
                                    ERR_NO_SERVICE_KEY_FALLBACK
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {u.active_school ? (
                                  <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded">
                                    <School className="w-3 h-3 text-cyan-400" />
                                    {u.active_school}
                                  </span>
                                ) : (
                                  <span className="text-slate-600 italic">Unassigned</span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-slate-400 flex items-center gap-1.5 mt-0.5">
                                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                                {new Date(u.created_at).toLocaleDateString()}
                              </td>
                              <td className="px-6 py-4 text-[10px] text-slate-600 font-mono tracking-tight">
                                {u.id}
                              </td>
                            </tr>
                          ))}
                          {users.length === 0 && (
                            <tr>
                              <td colSpan={5} className="text-center py-12 text-slate-600 font-mono">
                                NO_RECORDS_MATCH_ACTIVE_FILTER
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 2. STORIES LIST SHEET */}
                {activeTab === "stories" && (
                  <div className="grid gap-4">
                    {stories.map((s: any) => (
                      <article
                        key={s.id}
                        className="bg-slate-950/50 border border-slate-800 hover:border-emerald-500/20 p-5 rounded-xl transition-all shadow-md relative group"
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                              #{s.category}
                            </span>
                            <h3 className="text-lg font-bold text-slate-200 tracking-tight">{s.title}</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <School className="w-3.5 h-3.5 text-cyan-400/80" />
                              {s.schools?.name ?? "No school reference"}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to permanently delete this story entry?")) {
                                deleteStoryMutation.mutate(s.id);
                              }
                            }}
                            disabled={deleteStoryMutation.isPending}
                            className="bg-rose-950/20 text-rose-400 hover:text-slate-100 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-400 p-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                            title="Delete Confession"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Purge</span>
                          </button>
                        </div>

                        <p className="text-xs leading-relaxed text-slate-400 bg-slate-900/60 p-4 border border-slate-900 rounded-lg whitespace-pre-wrap mb-4 font-mono">
                          {s.body}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-slate-400 font-bold border-t border-slate-900/80 pt-3">
                          <div>
                            AUTHOR_HANDLE: <span className="text-slate-200 font-semibold">{s.author_handle}</span>
                          </div>
                          <div className="text-cyan-400 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-cyan-400/60" />
                            {s.author_email ?? "UNAVAILABLE_SECRET"}
                          </div>
                          <div className="text-slate-500 font-mono">
                            TIMESTAMP: {new Date(s.created_at).toLocaleString()}
                          </div>
                        </div>
                      </article>
                    ))}
                    {stories.length === 0 && (
                      <div className="text-center py-16 text-slate-600 font-mono">
                        NO_STORIES_FOUND_MATCHING_FILTER
                      </div>
                    )}
                  </div>
                )}

                {/* 3. COMMENTS LIST SHEET */}
                {activeTab === "comments" && (
                  <div className="grid gap-4">
                    {comments.map((c: any) => (
                      <article
                        key={c.id}
                        className="bg-slate-950/50 border border-slate-800 hover:border-rose-500/20 p-5 rounded-xl transition-all shadow-md relative group"
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold bg-rose-950 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded uppercase">
                              comment_record
                            </span>
                            <p className="text-xs text-slate-500">
                              Linked Post: <span className="text-slate-300 font-bold underline">{c.stories?.title ?? "Unknown post"}</span>
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this comment?")) {
                                deleteCommentMutation.mutate(c.id);
                              }
                            }}
                            disabled={deleteCommentMutation.isPending}
                            className="bg-rose-950/20 text-rose-400 hover:text-slate-100 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-400 p-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                            title="Delete Comment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Purge</span>
                          </button>
                        </div>

                        <p className="text-xs leading-relaxed text-slate-400 bg-slate-900/60 p-3.5 border border-slate-900 rounded-lg mb-4 font-mono">
                          "{c.body}"
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-slate-400 font-bold border-t border-slate-900/80 pt-3">
                          <div>
                            COMMENTER: <span className="text-slate-200 font-semibold">{c.author_handle}</span>
                          </div>
                          <div className="text-cyan-400 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-cyan-400/60" />
                            {c.author_email ?? "UNAVAILABLE_SECRET"}
                          </div>
                          <div className="text-slate-500 font-mono">
                            TIMESTAMP: {new Date(c.created_at).toLocaleString()}
                          </div>
                        </div>
                      </article>
                    ))}
                    {comments.length === 0 && (
                      <div className="text-center py-16 text-slate-600 font-mono">
                        NO_COMMENTS_FOUND_MATCHING_FILTER
                      </div>
                    )}
                  </div>
                )}

                {/* 4. LEGENDS LIST SHEET */}
                {activeTab === "legends" && (
                  <div className="grid gap-4">
                    {legends.map((l: any) => (
                      <article
                        key={l.id}
                        className="bg-slate-950/50 border border-slate-800 hover:border-amber-500/20 p-5 rounded-xl transition-all shadow-md relative group"
                      >
                        <div className="flex justify-between items-start gap-4 mb-3">
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold bg-amber-950 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded uppercase flex items-center gap-1 w-fit">
                              <Trophy className="w-3 h-3 text-amber-400" />
                              nominated_legend
                            </span>
                            <h3 className="text-lg font-bold text-slate-200 tracking-tight">{l.name}</h3>
                            <p className="text-xs text-slate-500 flex items-center gap-1">
                              <School className="w-3.5 h-3.5 text-cyan-400/80" />
                              {l.schools?.name ?? "No school reference"}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm("Are you sure you want to remove this nominated legend?")) {
                                deleteLegendMutation.mutate(l.id);
                              }
                            }}
                            disabled={deleteLegendMutation.isPending}
                            className="bg-rose-950/20 text-rose-400 hover:text-slate-100 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-400 p-2.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                            title="Remove Legend"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Purge</span>
                          </button>
                        </div>

                        <p className="text-xs leading-relaxed text-slate-400 bg-slate-900/60 p-4 border border-slate-900 rounded-lg whitespace-pre-wrap mb-4 font-mono">
                          {l.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] text-slate-400 font-bold border-t border-slate-900/80 pt-3">
                          <div>
                            NOMINATOR: <span className="text-slate-200 font-semibold">{l.author_handle}</span>
                          </div>
                          <div className="text-cyan-400 flex items-center gap-1">
                            <Mail className="w-3 h-3 text-cyan-400/60" />
                            {l.author_email ?? "UNAVAILABLE_SECRET"}
                          </div>
                          <div className="text-slate-500 font-mono">
                            TIMESTAMP: {new Date(l.created_at).toLocaleString()}
                          </div>
                        </div>
                      </article>
                    ))}
                    {legends.length === 0 && (
                      <div className="text-center py-16 text-slate-600 font-mono">
                        NO_LEGENDS_FOUND_MATCHING_FILTER
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Retro-futuristic scanlines style effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] z-50 opacity-15" />
    </div>
  );
}
