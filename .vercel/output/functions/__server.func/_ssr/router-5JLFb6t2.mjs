import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, d as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { J as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-D6wJbO6y.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-BOqiUA_g.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const AuthContext = reactExports.createContext({ user: null, session: null, loading: true });
function AuthProvider({ children }) {
  const [state, setState] = reactExports.useState({ user: null, session: null, loading: true });
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ user: session?.user ?? null, session, loading: false });
    });
    supabase.auth.getSession().then(({ data }) => {
      setState({ user: data.session?.user ?? null, session: data.session, loading: false });
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext.Provider, { value: state, children });
}
function useAuth() {
  return reactExports.useContext(AuthContext);
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4 bg-paper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-lg font-hand", children: "This page wandered off campus." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-pink",
        children: "Go home"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4 bg-paper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold", children: "Something went sideways" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm opacity-70", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 bg-foreground text-background px-4 py-2 font-bold rounded shadow-zine-sm",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BunkyBloom — Every School Has Legends" },
      {
        name: "description",
        content: "Share funny school memories anonymously and vote on the greatest school legends. Built for your campus community."
      },
      { property: "og:title", content: "BunkyBloom" },
      { property: "og:description", content: "Anonymous school stories and the Legend Board." },
      { property: "og:type", content: "website" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  const router2 = useRouter();
  reactExports.useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      router2.invalidate();
      queryClient.invalidateQueries();
    });
    return () => sub.subscription.unsubscribe();
  }, [router2, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] }) });
}
const $$splitComponentImporter$b = () => import("./stories-BFsOu0JM.mjs");
const Route$b = createFileRoute("/stories")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./schools-BTU5dmpx.mjs");
const Route$a = createFileRoute("/schools")({
  beforeLoad: () => {
    throw redirect({
      to: "/"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./login-nAyGnY6K.mjs");
const Route$9 = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — BunkyBloom"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./legends-BFsOu0JM.mjs");
const Route$8 = createFileRoute("/legends")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin-BFsOu0JM.mjs");
const Route$7 = createFileRoute("/admin")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./index-C14cov8n.mjs");
const Route$6 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./stories.index-L6RappmR.mjs");
const Route$5 = createFileRoute("/stories/")({
  head: () => ({
    meta: [{
      title: "Stories — BunkyBloom"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./legends.index-DnZkcPJK.mjs");
const Route$4 = createFileRoute("/legends/")({
  head: () => ({
    meta: [{
      title: "Legend Board — BunkyBloom"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.index-B2AxMN7Y.mjs");
const Route$3 = createFileRoute("/admin/")({
  head: () => ({
    meta: [{
      title: "BunkyBloom Terminal — Admin Console"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./stories.new-Cs_FMqgT.mjs");
const Route$2 = createFileRoute("/stories/new")({
  head: () => ({
    meta: [{
      title: "New story — BunkyBloom"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./stories._id-mMehIrIk.mjs");
const Route$1 = createFileRoute("/stories/$id")({
  head: () => ({
    meta: [{
      title: "Story — BunkyBloom"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./legends.new-Dgk7H_Gs.mjs");
const Route = createFileRoute("/legends/new")({
  head: () => ({
    meta: [{
      title: "Nominate a Legend — BunkyBloom"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const StoriesRoute = Route$b.update({
  id: "/stories",
  path: "/stories",
  getParentRoute: () => Route$c
});
const SchoolsRoute = Route$a.update({
  id: "/schools",
  path: "/schools",
  getParentRoute: () => Route$c
});
const LoginRoute = Route$9.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$c
});
const LegendsRoute = Route$8.update({
  id: "/legends",
  path: "/legends",
  getParentRoute: () => Route$c
});
const AdminRoute = Route$7.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const StoriesIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => StoriesRoute
});
const LegendsIndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => LegendsRoute
});
const AdminIndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const StoriesNewRoute = Route$2.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => StoriesRoute
});
const StoriesIdRoute = Route$1.update({
  id: "/$id",
  path: "/$id",
  getParentRoute: () => StoriesRoute
});
const LegendsNewRoute = Route.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => LegendsRoute
});
const AdminRouteChildren = {
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const LegendsRouteChildren = {
  LegendsNewRoute,
  LegendsIndexRoute
};
const LegendsRouteWithChildren = LegendsRoute._addFileChildren(LegendsRouteChildren);
const StoriesRouteChildren = {
  StoriesIdRoute,
  StoriesNewRoute,
  StoriesIndexRoute
};
const StoriesRouteWithChildren = StoriesRoute._addFileChildren(StoriesRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  LegendsRoute: LegendsRouteWithChildren,
  LoginRoute,
  SchoolsRoute,
  StoriesRoute: StoriesRouteWithChildren
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  router as r,
  useAuth as u
};
