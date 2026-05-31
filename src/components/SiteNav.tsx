import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

export function SiteNav({ schoolName }: { schoolName?: string | null }) {
  const { user, loading } = useAuth();
  return (
    <nav className="max-w-6xl mx-auto flex items-center justify-between mb-12 px-4 md:px-8 pt-6">
      <div className="flex items-center gap-6">
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
      </div>
      <div className="flex gap-4 md:gap-6 items-center text-sm font-bold uppercase tracking-widest">
        <Link to="/stories" className="hover:text-marker-blue transition-colors hidden sm:inline">
          Memories
        </Link>
        <Link to="/legends" className="hover:text-marker-pink transition-colors hidden sm:inline">
          Legends
        </Link>
        {loading ? null : user ? (
          <>
            <Link
              to="/stories/new"
              className="bg-foreground text-background px-4 py-2 rounded-sm rotate-[1deg] hover:rotate-0 transition-transform"
            >
              Post Story
            </Link>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-xs underline opacity-60 hover:opacity-100"
            >
              Sign out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-foreground text-background px-4 py-2 rounded-sm rotate-[1deg] hover:rotate-0 transition-transform"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
}
