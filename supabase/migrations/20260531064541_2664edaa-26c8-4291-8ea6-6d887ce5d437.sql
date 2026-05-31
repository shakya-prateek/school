
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.story_votes_after() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.story_comments_after() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.legend_votes_after() FROM PUBLIC, anon, authenticated;
