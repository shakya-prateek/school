import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { DeleteOwnContentButton } from "@/components/DeleteOwnContentButton";
import { SiteNav } from "@/components/SiteNav";
import { useAuth } from "@/lib/auth-context";
import { getMyContext, resolveViewSchool } from "@/lib/schools.functions";
import {
  CATEGORY_LABELS,
  STORY_CATEGORIES,
  deleteStory,
  listStories,
  type StoryCategory,
} from "@/lib/stories.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/stories/")({
  head: () => ({ meta: [{ title: "Stories — BunkyBloom" }] }),
  component: StoriesPage,
});

function StoriesPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [sort, setSort] = useState<"trending" | "newest">("newest");
  const [category, setCategory] = useState<StoryCategory | "">("");
  const [q, setQ] = useState("");

  const fetchCtx = useServerFn(getMyContext);
  const fetchViewSchool = useServerFn(resolveViewSchool);
  const fetchStories = useServerFn(listStories);
  const doDelete = useServerFn(deleteStory);

  const { data: ctx } = useQuery({ queryKey: ["me"], queryFn: () => fetchCtx(), enabled: !!user });
  const activeSchoolId = ctx?.activeSchool?.id;

  const { data: viewSchool } = useQuery({
    queryKey: ["viewSchool", activeSchoolId ?? "default"],
    queryFn: () => fetchViewSchool({ data: { schoolId: activeSchoolId } }),
  });

  const schoolId = viewSchool?.school?.id;
  const schoolName = viewSchool?.school?.name ?? ctx?.activeSchool?.name;

  const { data, isError, error } = useQuery({
    queryKey: ["stories", schoolId, sort, category, q],
    queryFn: () =>
      fetchStories({
        data: { schoolId: schoolId!, sort, category: category || undefined, q: q || undefined },
      }),
    enabled: !!schoolId,
  });

  const remove = useMutation({
    mutationFn: (storyId: string) => doDelete({ data: { id: storyId } }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["stories"] });
      await qc.invalidateQueries({ queryKey: ["home"] });
      toast.success("Story deleted");
    },
    onError: (e: Error) => toast.error(e.message),
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
          {schoolId && (
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
        ) : isError ? (
          <p className="text-center text-red-600 font-hand text-xl py-16">
            {(error as Error).message}
          </p>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3 mb-8 items-stretch sm:items-center">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles..."
                className="px-3 py-2 border-2 border-ink rounded bg-card text-sm w-full sm:w-64"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as StoryCategory | "")}
                className="px-3 py-2 border-2 border-ink rounded bg-card text-sm font-bold w-full sm:w-auto"
              >
                <option value="">All categories</option>
                {STORY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
              <div className="flex border-2 border-ink rounded overflow-hidden text-sm font-bold w-full sm:w-auto">
                {(["newest", "trending"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSort(s)}
                    className={`flex-1 sm:flex-initial text-center px-4 py-2 cursor-pointer ${sort === s ? "bg-foreground text-background" : "bg-card"}`}
                  >
                    {s === "newest" ? "Newest" : "Trending"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              {(data?.stories ?? []).map((s: any, i: number) => (
                <div key={s.id}>
                  <Link to="/stories/$id" params={{ id: s.id }} className="block">
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
                        <div className="flex flex-col items-center bg-paper border-2 border-ink p-2.5 rounded-lg shrink-0 min-w-[3.5rem] select-none">
                          <span className="text-lg leading-none">▲</span>
                          <span className="font-bold text-sm leading-none mt-1">{s.score}</span>
                          <span className="text-[9px] font-bold uppercase tracking-wider opacity-60 mt-1">Votes</span>
                        </div>
                      </div>
                      <p className="font-hand text-lg opacity-80 line-clamp-3 mb-4">{s.body}</p>
                      <div className="flex gap-4 text-xs font-bold opacity-50 uppercase tracking-widest">
                        <span>Anonymous</span>
                        <span>•</span>
                        <span>{s.comment_count ?? 0} comments</span>
                      </div>
                    </article>
                  </Link>
                  {user?.id === s.author_id && (
                    <div className="flex justify-end mt-2">
                      <DeleteOwnContentButton
                        kind="story"
                        isPending={remove.isPending}
                        onConfirm={() => remove.mutate(s.id)}
                      />
                    </div>
                  )}
                </div>
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
      <p className="font-hand text-2xl opacity-70 mb-4">No schools yet. Create one to get started.</p>
      <Link
        to="/schools"
        className="bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm"
      >
        Add a school
      </Link>
    </div>
  );
}
