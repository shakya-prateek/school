import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { useAuth } from "@/lib/auth-context";
import {
  CATEGORY_LABELS,
  addComment,
  getStory,
  voteStory,
  type StoryCategory,
} from "@/lib/stories.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/stories/$id")({
  head: () => ({ meta: [{ title: "Story — BunkyBloom" }] }),
  component: StoryDetail,
});

function StoryDetail() {
  const { id } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();
  const fetchStory = useServerFn(getStory);
  const doVote = useServerFn(voteStory);
  const doComment = useServerFn(addComment);
  const [comment, setComment] = useState("");

  const { data } = useQuery({
    queryKey: ["story", id],
    queryFn: () => fetchStory({ data: { id } }),
  });

  const vote = useMutation({
    mutationFn: (value: 1 | -1) => doVote({ data: { storyId: id, value } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["story", id] }),
    onError: (e: any) => toast.error(e.message),
  });
  const comm = useMutation({
    mutationFn: () => doComment({ data: { storyId: id, body: comment } }),
    onSuccess: () => {
      setComment("");
      qc.invalidateQueries({ queryKey: ["story", id] });
    },
    onError: (e: any) => toast.error(e.message),
  });

  const story = data?.story;
  const comments = data?.comments ?? [];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav schoolName={story?.schools?.name} />
      <main className="max-w-3xl mx-auto px-4 md:px-8 pb-24">
        <Link to="/stories" className="text-sm font-bold opacity-60 hover:opacity-100 mb-6 inline-block">
          ← Back to stories
        </Link>
        {!story ? (
          <p className="font-hand text-xl opacity-50">Loading...</p>
        ) : (
          <article className="bg-card border-2 border-ink rounded-xl p-8 shadow-zine relative">
            <div className="absolute -top-3 -left-2 bg-marker-blue text-white text-xs font-bold px-2 py-1 -rotate-3">
              #{CATEGORY_LABELS[story.category as StoryCategory]?.toUpperCase()}
            </div>
            <div className="flex justify-between items-start gap-4 mb-4">
              <h1 className="text-4xl font-bold">{story.title}</h1>
              <div className="flex flex-col items-center bg-paper border-2 border-ink p-3 rounded-lg shrink-0">
                <button
                  onClick={() => user ? vote.mutate(1) : toast.error("Sign in to vote")}
                  className="text-xl hover:text-marker-blue"
                >
                  ▲
                </button>
                <span className="font-bold text-lg">{story.score}</span>
                <button
                  onClick={() => user ? vote.mutate(-1) : toast.error("Sign in to vote")}
                  className="text-xl hover:text-marker-pink"
                >
                  ▼
                </button>
              </div>
            </div>
            <p className="font-hand text-xl leading-relaxed opacity-90 whitespace-pre-wrap mb-6">{story.body}</p>
            <div className="flex gap-3 text-xs font-bold opacity-50 uppercase tracking-widest">
              <span>{story.profiles?.display_handle ?? "Anonymous"}</span>
              <span>•</span>
              <span>{new Date(story.created_at).toLocaleDateString()}</span>
            </div>
          </article>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-bold mb-4">{comments.length} Comments</h2>
          {user ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (comment.trim()) comm.mutate();
              }}
              className="bg-card border-2 border-ink rounded p-4 shadow-zine-sm mb-6"
            >
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                rows={3}
                className="w-full px-3 py-2 border-2 border-ink rounded bg-paper font-hand text-lg focus:outline-none mb-3"
              />
              <button
                type="submit"
                disabled={comm.isPending || !comment.trim()}
                className="bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm disabled:opacity-50"
              >
                Post comment
              </button>
            </form>
          ) : (
            <p className="opacity-60 mb-6">
              <Link to="/login" className="underline">Sign in</Link> to comment.
            </p>
          )}
          <div className="space-y-3">
            {comments.map((c: any) => (
              <div key={c.id} className="bg-card/60 border-2 border-ink/20 rounded p-4">
                <p className="font-hand text-lg mb-1">{c.body}</p>
                <p className="text-xs opacity-50 uppercase tracking-widest font-bold">
                  {c.profiles?.display_handle ?? "Anonymous"} · {new Date(c.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
