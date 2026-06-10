import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, a as useQuery, u as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-iIgatL4r.mjs";
import { D as DeleteOwnContentButton } from "./DeleteOwnContentButton-B7xUpLVM.mjs";
import { S as SiteNav } from "./SiteNav-Dt9k7nVg.mjs";
import { R as Route$1, u as useAuth } from "./router-5JLFb6t2.mjs";
import { C as CATEGORY_LABELS, v as voteStory, d as deleteStory, a as addComment, g as getStory } from "./stories.functions-BwGeYBbE.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "./server-CQXPTDvh.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lucide-react.mjs";
import "./client-D6wJbO6y.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/tailwind-merge.mjs";
import "./auth-middleware-ovHzplJn.mjs";
import "../_libs/zod.mjs";
function StoryDetail() {
  const {
    id
  } = Route$1.useParams();
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const fetchStory = useServerFn(getStory);
  const doVote = useServerFn(voteStory);
  const doComment = useServerFn(addComment);
  const doDelete = useServerFn(deleteStory);
  const [comment, setComment] = reactExports.useState("");
  const {
    data
  } = useQuery({
    queryKey: ["story", id],
    queryFn: () => fetchStory({
      data: {
        id
      }
    })
  });
  const vote = useMutation({
    mutationFn: (value) => doVote({
      data: {
        storyId: id,
        value
      }
    }),
    onSuccess: () => qc.invalidateQueries({
      queryKey: ["story", id]
    }),
    onError: (e) => toast.error(e.message)
  });
  const comm = useMutation({
    mutationFn: () => doComment({
      data: {
        storyId: id,
        body: comment
      }
    }),
    onSuccess: () => {
      setComment("");
      qc.invalidateQueries({
        queryKey: ["story", id]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const remove = useMutation({
    mutationFn: () => doDelete({
      data: {
        id
      }
    }),
    onSuccess: async () => {
      await qc.invalidateQueries({
        queryKey: ["stories"]
      });
      await qc.invalidateQueries({
        queryKey: ["home"]
      });
      toast.success("Story deleted");
      navigate({
        to: "/stories"
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const story = data?.story;
  const isAuthor = !!user && story?.author_id === user.id;
  const comments = data?.comments ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-paper text-ink", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteNav, { schoolName: story?.schools?.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-3xl mx-auto px-4 md:px-8 pb-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories", className: "text-sm font-bold opacity-60 hover:opacity-100 mb-6 inline-block", children: "← Back to stories" }),
      !story ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-xl opacity-50", children: "Loading..." }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-card border-2 border-ink rounded-xl p-8 shadow-zine relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-3 -left-2 bg-marker-blue text-white text-xs font-bold px-2 py-1 -rotate-3", children: [
          "#",
          CATEGORY_LABELS[story.category]?.toUpperCase()
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold", children: story.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center bg-paper border-2 border-ink p-3 rounded-lg shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1 select-none", children: "Vote" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => user ? vote.mutate(1) : toast.error("Sign in to vote"), className: "text-xl hover:text-marker-blue cursor-pointer transition-colors", title: "Upvote", children: "▲" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg my-1", children: story.score }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => user ? vote.mutate(-1) : toast.error("Sign in to vote"), className: "text-xl hover:text-marker-pink cursor-pointer transition-colors", title: "Downvote", children: "▼" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-xl leading-relaxed opacity-90 whitespace-pre-wrap mb-6", children: story.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-xs font-bold opacity-50 uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Anonymous" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "•" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(story.created_at).toLocaleDateString() })
        ] })
      ] }),
      story && isAuthor && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteOwnContentButton, { kind: "story", isPending: remove.isPending, onConfirm: () => remove.mutate() }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold mb-4", children: [
          comments.length,
          " Comments"
        ] }),
        user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
          e.preventDefault();
          if (comment.trim()) comm.mutate();
        }, className: "bg-card border-2 border-ink rounded p-4 shadow-zine-sm mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Add a comment...", rows: 3, className: "w-full px-3 py-2 border-2 border-ink rounded bg-paper font-hand text-lg focus:outline-none mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: comm.isPending || !comment.trim(), className: "bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm disabled:opacity-50", children: "Post comment" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "opacity-60 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "underline", children: "Sign in" }),
          " ",
          "to comment."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: comments.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card/60 border-2 border-ink/20 rounded p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-lg mb-1", children: c.body }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs opacity-50 uppercase tracking-widest font-bold", children: [
            "Anonymous ·",
            " ",
            new Date(c.created_at).toLocaleDateString()
          ] })
        ] }, c.id)) })
      ] })
    ] })
  ] });
}
export {
  StoryDetail as component
};
