
-- =========================================================
-- ENUMS
-- =========================================================
CREATE TYPE public.story_category AS ENUM (
  'teachers','exams','backbenchers','school_trips',
  'friend_groups','classroom_chaos','confessions'
);

-- =========================================================
-- PROFILES
-- =========================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_handle TEXT NOT NULL,
  active_school_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles readable by authenticated" ON public.profiles
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (id = auth.uid());

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  handle TEXT;
BEGIN
  handle := COALESCE(
    NEW.raw_user_meta_data->>'display_handle',
    'Anonymous' || substring(replace(NEW.id::text, '-', '') for 6)
  );
  INSERT INTO public.profiles (id, display_handle) VALUES (NEW.id, handle);
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================
-- SCHOOLS
-- =========================================================
CREATE TABLE public.schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.schools TO authenticated;
GRANT ALL ON public.schools TO service_role;
GRANT SELECT ON public.schools TO anon;
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
CREATE POLICY "schools public read" ON public.schools FOR SELECT USING (true);
CREATE POLICY "authed users create schools" ON public.schools
  FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

CREATE TABLE public.school_members (
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (school_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.school_members TO authenticated;
GRANT ALL ON public.school_members TO service_role;
ALTER TABLE public.school_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "members readable by authenticated" ON public.school_members
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "users join schools" ON public.school_members
  FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "users leave schools" ON public.school_members
  FOR DELETE TO authenticated USING (user_id = auth.uid());

-- Profiles FK to schools (added after schools exists)
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_active_school_fk
  FOREIGN KEY (active_school_id) REFERENCES public.schools(id) ON DELETE SET NULL;

-- =========================================================
-- STORIES
-- =========================================================
CREATE TABLE public.stories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  category public.story_category NOT NULL,
  score INT NOT NULL DEFAULT 0,
  comment_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX stories_school_created_idx ON public.stories(school_id, created_at DESC);
CREATE INDEX stories_school_score_idx ON public.stories(school_id, score DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.stories TO authenticated;
GRANT SELECT ON public.stories TO anon;
GRANT ALL ON public.stories TO service_role;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "stories public read" ON public.stories FOR SELECT USING (true);
CREATE POLICY "authed create stories" ON public.stories
  FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "authors delete stories" ON public.stories
  FOR DELETE TO authenticated USING (author_id = auth.uid());

CREATE TABLE public.story_votes (
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  value SMALLINT NOT NULL CHECK (value IN (-1, 1)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (story_id, user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.story_votes TO authenticated;
GRANT ALL ON public.story_votes TO service_role;
ALTER TABLE public.story_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "votes readable by authenticated" ON public.story_votes
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "users manage own story vote" ON public.story_votes
  FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

-- score maintenance
CREATE OR REPLACE FUNCTION public.story_votes_after()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.stories SET score = score + NEW.value WHERE id = NEW.story_id;
  ELSIF TG_OP = 'UPDATE' THEN
    UPDATE public.stories SET score = score + (NEW.value - OLD.value) WHERE id = NEW.story_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.stories SET score = score - OLD.value WHERE id = OLD.story_id;
  END IF;
  RETURN NULL;
END;
$$;
CREATE TRIGGER story_votes_trg
  AFTER INSERT OR UPDATE OR DELETE ON public.story_votes
  FOR EACH ROW EXECUTE FUNCTION public.story_votes_after();

CREATE TABLE public.story_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id UUID NOT NULL REFERENCES public.stories(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX story_comments_story_idx ON public.story_comments(story_id, created_at DESC);
GRANT SELECT, INSERT, DELETE ON public.story_comments TO authenticated;
GRANT SELECT ON public.story_comments TO anon;
GRANT ALL ON public.story_comments TO service_role;
ALTER TABLE public.story_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "comments public read" ON public.story_comments FOR SELECT USING (true);
CREATE POLICY "authed create comment" ON public.story_comments
  FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "authors delete comment" ON public.story_comments
  FOR DELETE TO authenticated USING (author_id = auth.uid());

CREATE OR REPLACE FUNCTION public.story_comments_after()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.stories SET comment_count = comment_count + 1 WHERE id = NEW.story_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.stories SET comment_count = GREATEST(comment_count - 1, 0) WHERE id = OLD.story_id;
  END IF;
  RETURN NULL;
END;
$$;
CREATE TRIGGER story_comments_trg
  AFTER INSERT OR DELETE ON public.story_comments
  FOR EACH ROW EXECUTE FUNCTION public.story_comments_after();

-- =========================================================
-- LEGENDS
-- =========================================================
CREATE TABLE public.legends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX legends_school_score_idx ON public.legends(school_id, score DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legends TO authenticated;
GRANT SELECT ON public.legends TO anon;
GRANT ALL ON public.legends TO service_role;
ALTER TABLE public.legends ENABLE ROW LEVEL SECURITY;
CREATE POLICY "legends public read" ON public.legends FOR SELECT USING (true);
CREATE POLICY "authed create legend" ON public.legends
  FOR INSERT TO authenticated WITH CHECK (author_id = auth.uid());
CREATE POLICY "authors delete legend" ON public.legends
  FOR DELETE TO authenticated USING (author_id = auth.uid());

CREATE TABLE public.legend_votes (
  legend_id UUID NOT NULL REFERENCES public.legends(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (legend_id, user_id)
);
GRANT SELECT, INSERT, DELETE ON public.legend_votes TO authenticated;
GRANT ALL ON public.legend_votes TO service_role;
ALTER TABLE public.legend_votes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "legend votes readable by authenticated" ON public.legend_votes
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "users manage own legend vote" ON public.legend_votes
  FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.legend_votes_after()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.legends SET score = score + 1 WHERE id = NEW.legend_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.legends SET score = GREATEST(score - 1, 0) WHERE id = OLD.legend_id;
  END IF;
  RETURN NULL;
END;
$$;
CREATE TRIGGER legend_votes_trg
  AFTER INSERT OR DELETE ON public.legend_votes
  FOR EACH ROW EXECUTE FUNCTION public.legend_votes_after();
