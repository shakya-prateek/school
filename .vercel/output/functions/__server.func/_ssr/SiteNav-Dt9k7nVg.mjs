import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth } from "./router-5JLFb6t2.mjs";
import { s as supabase } from "./client-D6wJbO6y.mjs";
import { R as Root, b as Trigger, C as Close, P as Portal, a as Content, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { X, d as Menu, b as CircleQuestionMark, i as Sparkles, S as School, k as Trophy, B as BookOpen } from "../_libs/lucide-react.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Dialog = Root;
const DialogTrigger = Trigger;
const DialogPortal = Portal;
const DialogClose = Close;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
function HowItWorksModal() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "flex items-center gap-1 bg-highlighter/30 border-2 border-ink px-3 py-1.5 rounded-md shadow-zine-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-highlighter/50 transition-all cursor-pointer font-bold text-xs uppercase tracking-wider",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "How to use" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "border-2 border-ink bg-paper text-ink shadow-zine max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { className: "border-b-2 border-dashed border-ink pb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-bold text-2xl md:text-3xl flex items-center gap-2 rotate-[-1deg]", children: [
          "How to use BunkyBloom ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-6 h-6 text-marker-pink fill-marker-pink/20 animate-pulse" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "font-hand text-lg text-ink/80 text-left", children: "Your pocket guide to campus legends and anonymous chronicles." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 my-4 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg flex items-center gap-2 text-marker-blue", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(School, { className: "w-5 h-5 shrink-0" }),
            "1. How to Change School"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-90 leading-relaxed pl-7", children: [
            "Click on the school name badge in the top navbar (or head over to the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold underline", children: "Schools" }),
            " page). From there, you can search for your school, join it, and set it as your ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Active School" }),
            " to see its local content. Can't find yours? Start a new one!"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg flex items-center gap-2 text-marker-pink", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-5 h-5 shrink-0" }),
            "2. What is a Nominator?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm opacity-90 leading-relaxed pl-7", children: [
            "A **Nominator** is anyone who posts to the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Legend Board" }),
            ". If there's a student, teacher, or staff member who did something unforgettable (like the kid who sold snacks out of his locker, or the teacher who never gives homework), you can nominate them! Others can then upvote them to crown them the top legend."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-lg flex items-center gap-2 text-amber-600", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "w-5 h-5 shrink-0" }),
            "3. What is a Story?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm opacity-90 leading-relaxed pl-7 mb-3", children: "Stories are completely anonymous memories, funny incidents, or confessions from your school. Just select a category (like Confessions, Pranks, or Rumors) and post!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-7 bg-highlighter/10 border-2 border-ink border-dashed p-4 rounded-xl relative rotate-[0.5deg]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-2.5 right-4 bg-highlighter text-ink text-[10px] font-bold px-2 py-0.5 rounded border border-ink font-mono uppercase", children: "Example Story" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-bold text-sm mb-1 text-ink", children: "The 5th Period Phantom 👻" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-hand text-base leading-snug text-ink/90", children: `"Someone kept playing the 'Harry Potter theme song' on a recorder from the vents in the math wing. Nobody ever found out who did it, but it went on for 3 months and drove Mr. Henderson crazy!"` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t-2 border-dashed border-ink pt-4 flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          className: "w-full sm:w-auto px-6 py-2.5 bg-foreground text-background font-bold text-sm rounded shadow-zine-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer text-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-hand text-lg", children: "Got it, let's bloom! 🌸" })
        }
      ) }) })
    ] })
  ] });
}
function SiteNav({ schoolName }) {
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "max-w-6xl mx-auto mb-12 px-4 md:px-8 pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 md:gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "text-2xl font-bold tracking-tight border-b-4 border-marker-pink inline-block rotate-[-2deg]",
            style: { color: "var(--ink)" },
            children: "BunkyBloom"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksModal, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex gap-4 md:gap-6 items-center text-sm font-bold uppercase tracking-widest", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stories", className: "hover:text-marker-blue transition-colors", children: "Memories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/legends", className: "hover:text-marker-pink transition-colors", children: "Legends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/stories/new",
            className: "bg-foreground text-background px-4 py-2 rounded-sm rotate-[1deg] hover:rotate-0 transition-transform",
            children: "Post Story"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/legends/new",
            className: "border-2 border-ink px-4 py-2 rounded-sm hover:bg-card transition-colors",
            children: "Nominate"
          }
        ),
        loading ? null : user ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => supabase.auth.signOut(),
            className: "text-xs underline opacity-60 hover:opacity-100",
            children: "Sign out"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: "text-xs underline opacity-60 hover:opacity-100",
            children: "Sign in"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setMobileOpen(!mobileOpen),
          className: "sm:hidden flex items-center justify-center w-10 h-10 border-2 border-ink rounded-lg bg-card shadow-zine-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all",
          "aria-label": mobileOpen ? "Close menu" : "Open menu",
          children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-5 h-5" })
        }
      )
    ] }),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:hidden mt-4 bg-card border-2 border-ink rounded-xl p-5 shadow-zine space-y-3 animate-in fade-in slide-in-from-top-2 duration-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/stories",
          onClick: () => setMobileOpen(false),
          className: "block w-full text-center py-2 font-bold uppercase tracking-widest text-sm hover:text-marker-blue transition-colors",
          children: "Memories"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/legends",
          onClick: () => setMobileOpen(false),
          className: "block w-full text-center py-2 font-bold uppercase tracking-widest text-sm hover:text-marker-pink transition-colors",
          children: "Legends"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-ink/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/stories/new",
          onClick: () => setMobileOpen(false),
          className: "block w-full text-center py-3 bg-foreground text-background font-bold uppercase tracking-widest text-sm rounded shadow-zine-pink",
          children: "Post Story"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/legends/new",
          onClick: () => setMobileOpen(false),
          className: "block w-full text-center py-3 border-2 border-ink font-bold uppercase tracking-widest text-sm rounded hover:bg-paper transition-colors",
          children: "Nominate"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-ink/10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HowItWorksModal, {}),
        loading ? null : user ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              supabase.auth.signOut();
              setMobileOpen(false);
            },
            className: "text-xs font-bold underline opacity-60 hover:opacity-100",
            children: "Sign out"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            onClick: () => setMobileOpen(false),
            className: "text-xs font-bold underline opacity-60 hover:opacity-100",
            children: "Sign in"
          }
        )
      ] })
    ] })
  ] });
}
export {
  SiteNav as S,
  cn as c
};
