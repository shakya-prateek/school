import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { useAuth } from "@/lib/auth-context";
import { getMyContext, resolveViewSchool } from "@/lib/schools.functions";
import { createLegend } from "@/lib/legends.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/legends/new")({
  head: () => ({ meta: [{ title: "Nominate a Legend — BunkyBloom" }] }),
  component: NewLegendPage,
});

function NewLegendPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchCtx = useServerFn(getMyContext);
  const fetchViewSchool = useServerFn(resolveViewSchool);
  const doCreate = useServerFn(createLegend);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  const { data: ctx } = useQuery({ queryKey: ["me"], queryFn: () => fetchCtx(), enabled: !!user });
  const activeSchoolId = ctx?.activeSchool?.id;

  const { data: viewSchool, isLoading: schoolLoading } = useQuery({
    queryKey: ["viewSchool", activeSchoolId ?? "default"],
    queryFn: () => fetchViewSchool({ data: { schoolId: activeSchoolId } }),
  });

  const schoolId = viewSchool?.school?.id;

  const create = useMutation({
    mutationFn: () => doCreate({ data: { schoolId: schoolId!, name, description } }),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ["legends"] });
      await qc.invalidateQueries({ queryKey: ["home"] });
      toast.success("Legend nominated!");
      navigate({ to: "/legends" });
    },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="min-h-screen bg-paper text-ink">
      <SiteNav schoolName={viewSchool?.school?.name ?? ctx?.activeSchool?.name} />
      <main className="max-w-2xl mx-auto px-4 md:px-8 pb-24">
        <h1 className="text-4xl font-bold mb-2">Nominate a Legend</h1>
        <p className="font-hand text-xl opacity-70 mb-8">
          No real names, no harassment. Keep it fictional and funny.
        </p>

        {schoolLoading ? (
          <p className="font-hand text-xl opacity-70 text-center py-12">Loading...</p>
        ) : !schoolId ? (
          <div className="bg-card border-2 border-dashed border-ink/30 p-8 rounded-xl text-center">
            <p className="font-hand text-xl mb-4">No school yet. Create one to nominate.</p>
            <Link
              to="/schools"
              className="bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm"
            >
              Add a school
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
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Legend name (e.g. The Mop King)"
              className="w-full px-3 py-3 border-2 border-ink rounded bg-paper text-lg font-bold focus:outline-none"
            />
            <textarea
              maxLength={500}
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="The funny lore..."
              className="w-full px-3 py-3 border-2 border-ink rounded bg-paper font-hand text-lg focus:outline-none"
            />
            <button
              type="submit"
              disabled={create.isPending}
              className="w-full py-3 bg-foreground text-background font-bold rounded shadow-zine-pink hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
            >
              {create.isPending ? "Submitting..." : "Submit Legend"}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
