import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useEffect } from "react";
import { SiteNav } from "@/components/SiteNav";
import {
  createSchool,
  getMyContext,
  joinSchool,
  searchSchools,
  setActiveSchool,
} from "@/lib/schools.functions";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/schools")({
  head: () => ({ meta: [{ title: "Schools — BunkyBloom" }] }),
  component: SchoolsPage,
});

function SchoolsPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [newName, setNewName] = useState("");

  const fetchCtx = useServerFn(getMyContext);
  const fetchSearch = useServerFn(searchSchools);
  const doCreate = useServerFn(createSchool);
  const doJoin = useServerFn(joinSchool);
  const doSetActive = useServerFn(setActiveSchool);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const { data: ctx } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchCtx(),
    enabled: !!user,
  });
  const { data: search } = useQuery({
    queryKey: ["schools-search", q],
    queryFn: () => fetchSearch({ data: { q } }),
  });

  const join = useMutation({
    mutationFn: (id: string) => doJoin({ data: { schoolId: id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      toast.success("Joined!");
    },
  });
  const create = useMutation({
    mutationFn: (name: string) => doCreate({ data: { name } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      qc.invalidateQueries({ queryKey: ["schools-search"] });
      setNewName("");
      toast.success("School created!");
    },
    onError: (e: any) => toast.error(e.message),
  });
  const setActive = useMutation({
    mutationFn: (id: string) => doSetActive({ data: { schoolId: id } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["me"] });
      toast.success("Active school updated");
    },
  });

  const myIds = new Set((ctx?.memberships ?? []).map((m: any) => m.school_id));

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav schoolName={ctx?.activeSchool?.name} />
      <main className="max-w-3xl mx-auto px-4 md:px-8 pb-24">
        <h1 className="text-4xl font-bold mb-2">Pick your school</h1>
        <p className="font-hand text-xl opacity-70 mb-8">Every legend belongs to a community.</p>

        <section className="bg-card border-2 border-ink rounded-xl p-6 shadow-zine mb-8">
          <h2 className="font-bold text-lg mb-3">Start a new school</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="e.g. Westside High"
              className="flex-1 px-3 py-3 border-2 border-ink rounded bg-paper focus:outline-none w-full"
            />
            <button
              disabled={newName.trim().length < 2 || create.isPending}
              onClick={() => create.mutate(newName.trim())}
              className="px-6 py-3 bg-foreground text-background font-bold rounded shadow-zine-sm disabled:opacity-50 w-full sm:w-auto cursor-pointer"
            >
              Create
            </button>
          </div>
        </section>

        <section>
          <h2 className="font-bold text-lg mb-3">Find an existing school</h2>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search schools..."
            className="w-full px-3 py-3 border-2 border-ink rounded bg-paper focus:outline-none mb-4"
          />
          <div className="grid gap-3">
            {(search?.schools ?? []).map((s: any) => {
              const joined = myIds.has(s.id);
              const active = ctx?.activeSchool?.id === s.id;
              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between bg-card border-2 border-ink rounded-lg p-4 shadow-zine-sm"
                >
                  <div>
                    <div className="font-bold">{s.name}</div>
                    <div className="text-xs opacity-50 font-hand">{s.slug}</div>
                  </div>
                  {active ? (
                    <span className="text-xs font-bold uppercase tracking-wider text-marker-blue">
                      Active
                    </span>
                  ) : joined ? (
                    <button
                      onClick={() => setActive.mutate(s.id)}
                      className="px-3 py-2 border-2 border-ink text-xs font-bold rounded"
                    >
                      Set active
                    </button>
                  ) : (
                    <button
                      onClick={() => join.mutate(s.id)}
                      className="px-3 py-2 bg-foreground text-background text-xs font-bold rounded shadow-zine-sm"
                    >
                      Join
                    </button>
                  )}
                </div>
              );
            })}
            {(search?.schools ?? []).length === 0 && (
              <p className="text-sm opacity-50 font-hand text-center py-8">
                No schools match yet — start one above.
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
