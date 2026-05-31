import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { useAuth } from "@/lib/auth-context";
import { getMyContext } from "@/lib/schools.functions";
import { CATEGORY_LABELS, STORY_CATEGORIES, createStory } from "@/lib/stories.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/stories/new")({
  head: () => ({ meta: [{ title: "New story — BunkyBloom" }] }),
  component: NewStoryPage,
});

function NewStoryPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const fetchCtx = useServerFn(getMyContext);
  const doCreate = useServerFn(createStory);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<(typeof STORY_CATEGORIES)[number]>("classroom_chaos");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const { data: ctx } = useQuery({ queryKey: ["me"], queryFn: () => fetchCtx(), enabled: !!user });
  const schoolId = ctx?.activeSchool?.id;

  const create = useMutation({
    mutationFn: () => doCreate({ data: { schoolId: schoolId!, title, body, category } }),
    onSuccess: (r) => {
      toast.success("Story posted!");
      navigate({ to: "/stories/$id", params: { id: r.id } });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav schoolName={ctx?.activeSchool?.name} />
      <main className="max-w-2xl mx-auto px-4 md:px-8 pb-24">
        <h1 className="text-4xl font-bold mb-2">Share a memory</h1>
        <p className="font-hand text-xl opacity-70 mb-8">Anonymous. Just don't be cruel.</p>

        {!schoolId ? (
          <div className="bg-card border-2 border-dashed border-ink/30 p-8 rounded-xl text-center">
            <p className="font-hand text-xl mb-4">Pick a school first.</p>
            <Link to="/schools" className="bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm">
              Choose a school
            </Link>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              create.mutate();
            }}
            className="bg-card border-2 border-ink rounded-xl p-6 shadow-zine space-y-4"
          >
            <input
              required
              minLength={3}
              maxLength={140}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-3 py-3 border-2 border-ink rounded bg-paper text-lg font-bold focus:outline-none"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-3 border-2 border-ink rounded bg-paper font-bold"
            >
              {STORY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
            <textarea
              required
              minLength={5}
              maxLength={5000}
              rows={8}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tell the story..."
              className="w-full px-3 py-3 border-2 border-ink rounded bg-paper font-hand text-lg focus:outline-none"
            />
            <button
              type="submit"
              disabled={create.isPending}
              className="w-full py-3 bg-foreground text-background font-bold rounded shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
            >
              {create.isPending ? "Posting..." : "Post anonymously"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
