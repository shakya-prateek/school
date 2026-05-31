import { createFileRoute, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteNav } from "@/components/SiteNav";
import { useAuth } from "@/lib/auth-context";
import { getMyContext } from "@/lib/schools.functions";
import { listLegends, voteLegend } from "@/lib/legends.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/legends")({
  head: () => ({ meta: [{ title: "Legend Board — BunkyBloom" }] }),
  component: LegendsPage,
});

function LegendsPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const fetchCtx = useServerFn(getMyContext);
  const fetchLegends = useServerFn(listLegends);
  const doVote = useServerFn(voteLegend);

  const { data: ctx } = useQuery({ queryKey: ["me"], queryFn: () => fetchCtx(), enabled: !!user });
  const schoolId = ctx?.activeSchool?.id;
  const schoolName = ctx?.activeSchool?.name;

  const { data } = useQuery({
    queryKey: ["legends", schoolId],
    queryFn: () => fetchLegends({ data: { schoolId: schoolId! } }),
    enabled: !!schoolId,
  });

  const vote = useMutation({
    mutationFn: (id: string) => doVote({ data: { legendId: id, on: true } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["legends", schoolId] }),
    onError: (e: any) => toast.error(e.message),
  });

  const legends = data?.legends ?? [];
  const top3 = legends.slice(0, 3);
  const rest = legends.slice(3);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav schoolName={schoolName} />
      <main className="max-w-5xl mx-auto px-4 md:px-8 pb-24">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">Legend Board</h1>
            <p className="font-hand text-xl opacity-70">The hallway hall of fame.</p>
          </div>
          {user && schoolId && (
            <Link
              to="/legends/new"
              className="bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              + Nominate
            </Link>
          )}
        </div>

        {!schoolId ? (
          <div className="bg-card border-2 border-dashed border-ink/30 p-12 rounded-xl text-center">
            <p className="font-hand text-2xl opacity-70 mb-4">Pick a school to see its legends.</p>
            <Link to="/schools" className="bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm">
              Choose a school
            </Link>
          </div>
        ) : (
          <>
            {top3.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-16">
                {[1, 0, 2].map((idx, i) => {
                  const l = top3[idx];
                  if (!l) return <div key={i} />;
                  const heights = ["h-48", "h-64", "h-40"];
                  const colors = ["bg-marker-blue", "bg-highlighter", "bg-marker-pink"];
                  const rank = idx + 1;
                  return (
                    <div key={l.id} className={`text-center order-${i + 1}`}>
                      <div
                        className={`bg-card border-2 border-ink rounded-xl p-6 shadow-zine ${rank === 1 ? "scale-105" : ""}`}
                      >
                        <div
                          className={`w-12 h-12 ${colors[idx]} text-white rounded-full mx-auto mb-3 flex items-center justify-center font-bold text-xl border-2 border-ink`}
                        >
                          {rank}
                        </div>
                        <h3 className="font-bold text-xl mb-2">{l.name}</h3>
                        <p className="font-hand text-base opacity-80 line-clamp-3">{l.description}</p>
                        <p className="text-xs font-bold mt-3 text-marker-blue">{l.score} VOTES</p>
                        {user && (
                          <button
                            onClick={() => vote.mutate(l.id)}
                            className="mt-3 text-xs font-bold underline opacity-70 hover:opacity-100"
                          >
                            ▲ Vote
                          </button>
                        )}
                      </div>
                      <div className={`${heights[idx]} ${colors[idx]} border-2 border-ink border-t-0 rounded-b-xl opacity-40`} />
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-3">
              {rest.map((l: any, i: number) => (
                <div
                  key={l.id}
                  className="flex items-center gap-4 bg-card border-2 border-ink rounded-lg p-4 shadow-zine-sm"
                >
                  <span className="text-2xl font-bold opacity-30 w-8">{i + 4}</span>
                  <div className="flex-1">
                    <h4 className="font-bold">{l.name}</h4>
                    <p className="text-sm font-hand opacity-70">{l.description}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => (user ? vote.mutate(l.id) : toast.error("Sign in to vote"))}
                      className="hover:text-marker-blue"
                    >
                      ▲
                    </button>
                    <span className="font-bold text-sm">{l.score}</span>
                  </div>
                </div>
              ))}
              {legends.length === 0 && (
                <p className="text-center opacity-50 font-hand text-xl py-16">
                  No legends yet. Nominate the first one!
                </p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
