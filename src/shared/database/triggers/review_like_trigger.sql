CREATE OR REPLACE FUNCTION public.handle_review_like()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.reviews SET likes = likes + 1 WHERE review_id = NEW.review_id;
    RETURN NEW;
END;
$$;

CREATE TRIGGER review_like_trigger
AFTER INSERT ON public.reviews_likes
FOR EACH ROW EXECUTE FUNCTION public.handle_review_like();


CREATE OR REPLACE FUNCTION public.handle_review_unlike()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.reviews SET likes = likes - 1 WHERE review_id = OLD.review_id;
    RETURN OLD;
END;
$$;

CREATE TRIGGER review_unlike_trigger
AFTER DELETE ON public.reviews_likes
FOR EACH ROW EXECUTE FUNCTION public.handle_review_unlike();