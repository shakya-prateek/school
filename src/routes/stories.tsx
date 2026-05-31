import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { useAuth } from "@/lib/auth-context";
import { getMyContext } from "@/lib/schools.functions";
import {
  CATEGORY_LABELS,
  STORY_CATEGORIES,
  listStories,
  type StoryCategory,
} from "@/lib/stories.functions";

export const Route = createFileRoute("/stories")({
  head: () => ({ meta: [{ title: "Stories — BunkyBloom" }] }),
  component: StoriesPage,
});

function StoriesPage() {
  const { user } = useAuth();
  const [sort, setSort] = useState<"trending" | "newest">("newest");
  const [category, setCategory] = useState<StoryCategory | "">("");
  const [q, setQ] = useState("");

  const fetchCtx = useServerFn(getMyContext);
  const fetchStories = useServerFn(listStories);

  const { data: ctx } = useQuery({ queryKey: ["me"], queryFn: () => fetchCtx(), enabled: !!user });
  const schoolId = ctx?.activeSchool?.id;
  const schoolName = ctx?.activeSchool?.name;

  const { data } = useQuery({
    queryKey: ["stories", schoolId, sort, category, q],
    queryFn: () =>
      fetchStories({
        data: { schoolId: schoolId!, sort, category: category || undefined, q: q || undefined },
      }),
    enabled: !!schoolId,
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav schoolName={schoolName} />
      <main className="max-w-5xl mx-auto px-4 md:px-8 pb-24">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">Memories</h1>
            <p className="font-hand text-xl opacity-70">
              {schoolName ? `From ${schoolName}` : "Pick a school to see stories"}
            </p>
          </div>
          {user && schoolId && (
            <Link
              to="/stories/new"
              className="bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              + Post Story
            </Link>
          )}
        </div>

        {!schoolId ? (
          <NoSchool />
        ) : (
          <>
            <div className="flex flex-wrap gap-3 mb-8 items-center">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles..."
                className="px-3 py-2 border-2 border-ink rounded bg-card text-sm"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="px-3 py-2 border-2 border-ink rounded bg-card text-sm font-bold"
              >
                <option value="">All categories</option>
                {STORY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
              <div className="flex border-2 border-ink rounded overflow-hidden text-sm font-bold">
                {(["newest", "trending"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`px-3 py-2 ${sort === s ? "bg-foreground text-background" : "bg-card"}`}
                  >
                    {s === "newest" ? "Newest" : "Trending"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {(data?.stories ?? []).map((s: any, i: number) => (
                <Link key={s.id} to="/stories/$id" params={{ id: s.id }}>
                  <article className="bg-card border-2 border-ink p-6 rounded-xl shadow-zine relative hover:-translate-y-1 hover:-translate-x-1 transition-transform">
                    <div
                      className={`absolute -top-3 -left-2 text-white text-xs font-bold px-2 py-1 ${
                        i % 2 === 0 ? "bg-marker-blue -rotate-3" : "bg-marker-pink rotate-2"
                      }`}
                    >
                      #{CATEGORY_LABELS[s.category as StoryCategory]?.toUpperCase()}
                    </div>
                    <div className="flex justify-between gap-4 items-start mb-3">
                      <h3 className="text-2xl font-bold">{s.title}</h3>
                      <div className="flex flex-col items-center bg-paper border-2 border-ink p-2 rounded-lg shrink-0">
                        <span>▲</span>
                        <span className="font-bold">{s.score}</span>
                      </div>
                    </div>
                    <p className="font-hand text-lg opacity-80 line-clamp-3 mb-4">{s.body}</p>
                    <div className="flex gap-4 text-xs font-bold opacity-50 uppercase tracking-widest">
                      <span>{s.profiles?.display_handle ?? "Anonymous"}</span>
                      <span>•</span>
                      <span>{s.comment_count ?? 0} comments</span>
                    </div>
                  </article>
                </Link>
              ))}
              {(data?.stories ?? []).length === 0 && (
                <p className="text-center opacity-50 font-hand text-xl py-16">
                  No stories here yet. Start the legend.
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function NoSchool() {
  return (
    <div className="bg-card border-2 border-dashed border-ink/30 p-12 rounded-xl text-center">
      <p className="font-hand text-2xl opacity-70 mb-4">Pick a school first to see stories.</p>
      <Link to="/schools" className="bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm">
        Choose a school
      </Link>
    </div>
  );
}
