import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { HowItWorksModal } from "@/components/HowItWorksModal";

export function SiteNav({ schoolName }: { schoolName?: string | null }) {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="max-w-6xl mx-auto mb-12 px-4 md:px-8 pt-6">
      {/* ─── Top bar ─── */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 md:gap-6">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight border-b-4 border-marker-pink inline-block rotate-[-2deg]"
            style={{ color: "var(--ink)" }}
          >
            BunkyBloom
          </Link>
          <Link
            to="/schools"
            className="hidden md:flex items-center gap-2 bg-card border-2 border-ink px-3 py-1 rounded-full shadow-zine-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {schoolName ?? "Pick a school"}
            </span>
            <span className="opacity-40">▼</span>
          </Link>
          <span className="hidden sm:inline-flex">
            <HowItWorksModal />
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden sm:flex gap-4 md:gap-6 items-center text-sm font-bold uppercase tracking-widest">
          <Link to="/stories" className="hover:text-marker-blue transition-colors">
            Memories
          </Link>
          <Link to="/legends" className="hover:text-marker-pink transition-colors">
            Legends
          </Link>
          <Link
            to="/stories/new"
            className="bg-foreground text-background px-4 py-2 rounded-sm rotate-[1deg] hover:rotate-0 transition-transform"
          >
            Post Story
          </Link>
          <Link
            to="/legends/new"
            className="border-2 border-ink px-4 py-2 rounded-sm hover:bg-card transition-colors"
          >
            Nominate
          </Link>
          {loading ? null : user ? (
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-xs underline opacity-60 hover:opacity-100"
            >
              Sign out
            </button>
          ) : (
            <Link
              to="/login"
              className="text-xs underline opacity-60 hover:opacity-100"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden flex items-center justify-center w-10 h-10 border-2 border-ink rounded-lg bg-card shadow-zine-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ─── Mobile drawer ─── */}
      {mobileOpen && (
        <div className="sm:hidden mt-4 bg-card border-2 border-ink rounded-xl p-5 shadow-zine space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* School badge – visible on mobile */}
          <Link
            to="/schools"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-2 bg-paper border-2 border-ink px-3 py-2 rounded-full shadow-zine-sm w-full justify-center"
          >
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider">
              {schoolName ?? "Pick a school"}
            </span>
            <span className="opacity-40">▼</span>
          </Link>

          <div className="h-px bg-ink/10" />

          <Link
            to="/stories"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-2 font-bold uppercase tracking-widest text-sm hover:text-marker-blue transition-colors"
          >
            Memories
          </Link>
          <Link
            to="/legends"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-2 font-bold uppercase tracking-widest text-sm hover:text-marker-pink transition-colors"
          >
            Legends
          </Link>

          <div className="h-px bg-ink/10" />

          <Link
            to="/stories/new"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3 bg-foreground text-background font-bold uppercase tracking-widest text-sm rounded shadow-zine-pink"
          >
            Post Story
          </Link>
          <Link
            to="/legends/new"
            onClick={() => setMobileOpen(false)}
            className="block w-full text-center py-3 border-2 border-ink font-bold uppercase tracking-widest text-sm rounded hover:bg-paper transition-colors"
          >
            Nominate
          </Link>

          <div className="h-px bg-ink/10" />

          <div className="flex items-center justify-between gap-3">
            <HowItWorksModal />
            {loading ? null : user ? (
              <button
                onClick={() => {
                  supabase.auth.signOut();
                  setMobileOpen(false);
                }}
                className="text-xs font-bold underline opacity-60 hover:opacity-100"
              >
                Sign out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="text-xs font-bold underline opacity-60 hover:opacity-100"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
