CREATE OR REPLACE FUNCTION public.handle_village_like()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.villages SET likes = likes + 1 WHERE village_id = NEW.village_id;
    RETURN NEW;
END;
$$;

CREATE TRIGGER village_like_trigger
AFTER INSERT ON public.villages_likes
FOR EACH ROW EXECUTE FUNCTION public.handle_village_like();


CREATE OR REPLACE FUNCTION public.handle_village_unlike()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.villages SET likes = likes - 1 WHERE village_id = OLD.village_id;
    RETURN OLD;
END;
$$;

CREATE TRIGGER village_unlike_trigger
AFTER DELETE ON public.villages_likes
FOR EACH ROW EXECUTE FUNCTION public.handle_village_unlike();