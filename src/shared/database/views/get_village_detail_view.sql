CREATE OR REPLACE VIEW get_village_detail_view AS
SELECT villages.*,

  (SELECT EXISTS
     (SELECT 1
      FROM public.villages_likes
      WHERE villages_likes.village_id = villages.village_id
        AND villages_likes.profile_id = auth.uid())) AS is_liked
FROM villages