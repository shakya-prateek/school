import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — BunkyBloom" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/schools" });
  }, [user, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/schools` },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to confirm.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + "/schools",
    });
    if (result.error) {
      toast.error("Google sign-in failed");
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-paper text-ink flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center text-2xl font-bold mb-8 border-b-4 border-marker-pink inline-block">
          BunkyBloom
        </Link>
        <div className="bg-card border-2 border-ink rounded-xl p-8 shadow-zine">
          <h1 className="text-3xl font-bold mb-2">{mode === "signin" ? "Welcome back" : "Join the chronicles"}</h1>
          <p className="text-sm opacity-70 mb-6 font-hand text-lg">
            {mode === "signin" ? "Sign in to post and vote." : "Create an account to share your stories."}
          </p>

          <button
            onClick={handleGoogle}
            disabled={busy}
            className="w-full mb-4 py-3 border-2 border-ink rounded font-bold hover:bg-paper transition-colors disabled:opacity-50"
          >
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-4 text-xs uppercase tracking-widest opacity-50">
            <div className="h-px flex-1 bg-ink/20" /> or <div className="h-px flex-1 bg-ink/20" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-3 py-3 border-2 border-ink rounded bg-paper focus:outline-none focus:shadow-zine-sm transition-shadow"
            />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-3 py-3 border-2 border-ink rounded bg-paper focus:outline-none focus:shadow-zine-sm transition-shadow"
            />
            <button
              type="submit"
              disabled={busy}
              className="w-full py-3 bg-foreground text-background font-bold rounded shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
            >
              {busy ? "..." : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="w-full mt-6 text-sm underline opacity-70 hover:opacity-100"
          >
            {mode === "signin" ? "New here? Create an account" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
