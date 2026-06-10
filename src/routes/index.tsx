import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SiteNav } from "@/components/SiteNav";
import { getHomeSnapshot } from "@/lib/legends.functions";
import { CATEGORY_LABELS, type StoryCategory } from "@/lib/stories.functions";
import { useAuth } from "@/lib/auth-context";
import { getMyContext } from "@/lib/schools.functions";
import { School, Trophy, BookOpen } from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { user } = useAuth();
  const fetchSnapshot = useServerFn(getHomeSnapshot);
  const fetchCtx = useServerFn(getMyContext);

  const { data: ctx } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCtx(),
    enabled: !!user,
  });
  const activeSchoolId = ctx?.activeSchool?.id;

  const { data: snapshot } = useQuery({
    queryKey: ["home", activeSchoolId ?? "default"],
    queryFn: () => fetchSnapshot({ data: { schoolId: activeSchoolId } }),
  });

  const topLegends = snapshot?.topLegends ?? [];
  const trending = snapshot?.trendingStories ?? [];
  const schoolName = ctx?.activeSchool?.name ?? snapshot?.school?.name ?? null;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav schoolName={schoolName} />

      <header className="max-w-4xl mx-auto text-center px-4 mb-24">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Every School Has{" "}
          <span className="relative inline-block px-2 italic font-hand text-marker-blue">
            Legends.
            <span className="absolute inset-0 bg-marker-blue/10 -rotate-1 -z-10" />
          </span>{" "}
          <br />
          Every Student Has{" "}
          <span className="relative">
            Stories.
            <span className="absolute bottom-1 left-0 w-full h-3 bg-highlighter/60 -z-10" />
          </span>
        </h1>
        <p className="text-xl opacity-70 mb-10 max-w-xl mx-auto font-medium">
          Share memories, discover hilarious school moments, and vote for the greatest school
          legends — anonymously.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/stories"
            className="w-full sm:w-auto px-8 py-4 bg-foreground text-background font-bold rounded-lg shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            Explore Stories
          </Link>
          <Link
            to="/legends"
            className="w-full sm:w-auto px-8 py-4 border-2 border-ink font-bold rounded-lg hover:bg-card transition-colors"
          >
            Visit Legend Board
          </Link>
        </div>
      </header>

      {/* ─── How it works guide ─── */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="bg-card border-2 border-ink rounded-3xl p-6 md:p-8 shadow-zine relative">
          <div className="absolute -top-4 left-6 bg-highlighter border-2 border-ink px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider rotate-[-1deg] shadow-zine-sm">
            Quick Guide: How to Bloom 🌸
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Step 1: Nominator */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl flex items-center gap-2 text-marker-pink">
                <Trophy className="w-6 h-6 shrink-0" />
                1. Nominate Legends
              </h3>
              <p className="text-sm opacity-90 leading-relaxed font-hand text-lg">
                Spotted someone legendary? A classmate, teacher, or canteen chef who did something unforgettable? Nominate them on the <Link to="/legends" className="underline font-bold">Legend Board</Link> and let everyone upvote them!
              </p>
            </div>

            {/* Step 2: Stories */}
            <div className="space-y-3">
              <h3 className="font-bold text-xl flex items-center gap-2 text-amber-600">
                <BookOpen className="w-6 h-6 shrink-0" />
                2. Share Memories
              </h3>
              <p className="text-sm opacity-90 leading-relaxed font-hand text-lg">
                Post completely anonymous memories, funny classroom incidents, or test confessions.
              </p>
              {/* Mini Example */}
              <div className="bg-highlighter/10 border border-ink border-dashed p-3 rounded-xl relative rotate-[0.5deg] text-xs">
                <h4 className="font-bold mb-1 text-ink flex items-center gap-1">
                  Example: The Bell Prank 🔔
                </h4>
                <p className="font-hand text-sm leading-snug text-ink/80">
                  "Someone replaced all the hallway bells with the sound of a rooster crowing. The teachers were so confused for three classes!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
        <section className="lg:col-span-2">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <div className="h-px flex-1 bg-ink/10" />
          </div>
          {trending.length === 0 ? (
            <EmptyCard
              text="No stories yet for this school. Be the first to share something legendary."
              cta={{ to: "/stories/new", label: "Post a story" }}
            />
          ) : (
            <div className="grid gap-8">
              {trending.map((s: any, i: number) => (
                <StoryCard key={s.id} story={s} accent={i % 2 === 0 ? "blue" : "pink"} />
              ))}
            </div>
          )}
        </section>

        <aside>
          <div className="bg-highlighter/20 border-2 border-ink border-dashed p-8 rounded-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center rotate-[-1deg]">Top Legends</h2>
            <div className="space-y-6">
              {topLegends.length === 0 ? (
                <p className="text-sm font-hand text-center opacity-70">
                  No legends yet. Nominate the first one!
                </p>
              ) : (
                topLegends.map((l: any, i: number) => (
                  <PodiumRow key={l.id} legend={l} rank={i + 1} />
                ))
              )}
            </div>
            <Link
              to="/legends/new"
              className="block text-center w-full mt-8 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-sm rounded hover:scale-[1.02] transition-transform"
            >
              Nominate a Legend
            </Link>
          </div>
        </aside>
      </main>

      <footer className="border-t-2 border-ink/10 py-12 text-center overflow-hidden whitespace-nowrap">
        <div className="flex gap-12 text-4xl font-hand opacity-20 justify-center">
          <span>Class of '25 was here</span>
          <span>Don't eat the blue jello</span>
          <span>BunkyBloom Forever</span>
          <span>Legendary Status Pending</span>
        </div>
      </footer>
    </div>
  );
}

function StoryCard({ story, accent }: { story: any; accent: "blue" | "pink" }) {
  const tagColor = accent === "blue" ? "bg-marker-blue" : "bg-marker-pink";
  const cat = (story.category as StoryCategory) ?? "confessions";
  return (
    <Link to="/stories/$id" params={{ id: story.id }}>
      <article className="bg-card border-2 border-ink p-6 rounded-xl shadow-zine relative hover:-translate-y-1 hover:-translate-x-1 transition-transform">
        <div
          className={`absolute -top-3 -left-2 text-white text-xs font-bold px-2 py-1 ${tagColor} ${accent === "blue" ? "-rotate-3" : "rotate-2"}`}
        >
          #{CATEGORY_LABELS[cat]?.toUpperCase() ?? cat}
        </div>
        <div className="flex justify-between items-start mb-4 gap-4">
          <h3 className="text-2xl font-bold">{story.title}</h3>
          <div className="flex flex-col items-center bg-paper border-2 border-ink p-2 rounded-lg shrink-0">
            <span className="text-xl">▲</span>
            <span className="font-bold">{story.score}</span>
          </div>
        </div>
        <p className="text-lg font-hand opacity-80 leading-relaxed line-clamp-3">{story.body}</p>
      </article>
    </Link>
  );
}

function PodiumRow({ legend, rank }: { legend: any; rank: number }) {
  if (rank === 1) {
    return (
      <div className="relative text-center">
        <div className="w-24 h-24 mx-auto mb-4 bg-card border-4 border-ink rounded-full flex items-center justify-center shadow-zine-blue text-3xl font-bold">
          ★
        </div>
        <div className="absolute top-0 right-1/4 bg-marker-blue text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 border-ink">
          1
        </div>
        <h4 className="font-bold text-xl">{legend.name}</h4>
        <p className="text-sm italic font-hand px-4 opacity-80">{legend.description}</p>
        <p className="text-xs font-bold mt-2 text-marker-blue">{legend.score} VOTES</p>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 bg-card/60 p-4 rounded-xl border-2 border-ink/10">
      <span className="text-2xl font-bold opacity-20">{rank}</span>
      <div className="flex-1">
        <h4 className="font-bold">{legend.name}</h4>
        <p className="text-xs font-hand opacity-70 line-clamp-1">{legend.description}</p>
      </div>
      <span className="font-bold text-sm">{legend.score}</span>
    </div>
  );
}

function EmptyCard({ text, cta }: { text: string; cta: { to: string; label: string } }) {
  return (
    <div className="bg-card border-2 border-dashed border-ink/30 p-8 rounded-xl text-center">
      <p className="font-hand text-xl opacity-70 mb-4">{text}</p>
      <Link
        to={cta.to as any}
        className="inline-flex bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm"
      >
        {cta.label}
      </Link>
    </div>
  );
}
