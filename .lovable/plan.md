## BunkyBloom — v1 plan

A school-scoped community where students anonymously share funny memories and vote on fictional "school legends" on a leaderboard. Built on TanStack Start + Lovable Cloud (Postgres, built-in auth, server functions). Visual direction: **Doodle Notebook Zine** — paper background, hard ink borders, offset drop shadows, Space Grotesk + Gaegu handwritten accents, marker-blue / marker-pink / highlighter-yellow accents.

### Scope (v1)

In:
- Auth: email/password + Google sign-in (Lovable Cloud)
- Schools: users create or search-and-join any school; everything is scoped to the active school
- Stories: create, list, single-vote up/down, comment, filter by category, search, sort by Trending / Newest
- Legend Board: create legend, vote, ranked leaderboard with top-3 podium
- Anonymous identity (display name like "Anonymous Junior"; real user id stored server-side only)

Out (deferred):
- Profile page, badges, admin dashboard, notifications, image uploads, downvotes on legends, anonymous guest mode

### Pages

- `/` — Landing (hero, top 3 legends preview, trending stories preview, school chip in nav)
- `/login` — Email + Google sign-in, plus a school picker after first login
- `/schools` — Search existing schools or create a new one; sets active school
- `/stories` — Feed: category filter, search, sort (Trending/Newest), story cards
- `/stories/new` — Create story (title, body, category)
- `/stories/$id` — Story detail with comments
- `/legends` — Leaderboard with podium for top 3 and ranked list below
- `/legends/new` — Create legend (name, description)
- `/_authenticated` layout — gates create/vote routes

### Data model (Postgres via Lovable Cloud)

```text
schools          (id, slug, name, created_by, created_at)
school_members   (school_id, user_id, joined_at)   -- which schools a user belongs to
profiles         (id=auth.users.id, display_handle, active_school_id)

stories          (id, school_id, author_id, title, body, category, score, created_at)
story_votes      (story_id, user_id, value:int check in (-1,1))   -- PK(story_id,user_id)
story_comments   (id, story_id, author_id, body, created_at)

legends          (id, school_id, author_id, name, description, score, created_at)
legend_votes     (legend_id, user_id, value:int check in (1))      -- PK(legend_id,user_id), upvote-only
```

- `score` columns are denormalized counters maintained by triggers on the vote tables, so leaderboards/trending sort in O(rows) without aggregations.
- Trending = `score * exp(-age_hours / 24)` computed in the server fn at read time.
- RLS: read = member of the row's school; write = authenticated + author_id = auth.uid(); votes enforce one-per-user via PK.
- All public-schema tables get explicit GRANTs to `authenticated` and `service_role` per project rules.

### Server functions (`createServerFn`)

- `searchSchools`, `createSchool`, `joinSchool`, `setActiveSchool`
- `listStories({ sort, category, q })`, `getStory`, `createStory`, `voteStory`, `addComment`
- `listLegends`, `getTopLegends(limit=3)`, `createLegend`, `voteLegend`
- `getHomeSnapshot` — top legends + trending stories for the landing page

All user-scoped fns use `requireSupabaseAuth`; landing-page reads use a public server fn with `supabaseAdmin` scoped by school id.

### Design system

Port the prototype's tokens verbatim into `src/styles.css`:
- `--background: #fdfcf0` (paper), `--foreground: #1e293b` (ink)
- `--primary: #3b82f6` (marker-blue), `--accent: #f43f5e` (marker-pink), `--highlight: #facc15`
- Fonts: Space Grotesk (display/body), Gaegu (handwritten accents for story bodies, taglines)
- Signature components: bordered cards with `shadow-[8px_8px_0px_0px_var(--foreground)]`, slight rotations on chips/buttons, dashed-border highlighter panel for the legend podium, sticker-style category chips

Dark mode: deferred from v1 — the zine direction is paper-first. Will note this to the user.

### Tech notes (for the technical reader)

- TanStack Start file-based routes under `src/routes/`; `_authenticated.tsx` layout gates protected routes.
- TanStack Query + `ensureQueryData` / `useSuspenseQuery` for all reads; mutations invalidate the relevant keys (`['stories']`, `['legends']`, `['home']`).
- Voting: server fn upserts into `*_votes` and the trigger updates `score`; client uses optimistic update via `useMutation.onMutate`.
- Active school stored on `profiles.active_school_id` and echoed in a context so every server fn can scope by it.
- Google sign-in via the Lovable broker; `supabase--configure_social_auth` for `google` in the same step.

### Build order

1. Enable Lovable Cloud, run migrations for schools/profiles + RLS + GRANTs
2. Apply design tokens + base layout (nav with school chip, footer marquee)
3. Auth (email + Google) and school picker flow
4. Stories: schema, server fns, list/detail/create, voting + comments
5. Legends: schema, server fns, leaderboard + podium, create
6. Landing page wired to `getHomeSnapshot`

I'll mention the deferred items (profile/badges, admin, notifications, image uploads, dark mode) when v1 is delivered so you can pick what to add next.
