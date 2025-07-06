CREATE OR REPLACE VIEW get_review_detail_view AS
SELECT 
  reviews.*,
  profiles.avatar,
  profiles.nickname,
  villages.exprn_village_nm,
  villages.rdnmadr,
  villages.phone_number,
  villages.latitude,
  villages.longitude,
  
  (SELECT EXISTS
     (SELECT 1
      FROM public.reviews_likes
      WHERE reviews_likes.review_id = reviews.review_id
        AND reviews_likes.profile_id = auth.uid())) AS is_liked,
  
  (reviews.profile_id = auth.uid()) AS is_my_review

FROM reviews
LEFT JOIN profiles ON reviews.profile_id = profiles.profile_id
LEFT JOIN villages ON reviews.village_id = villages.village_id
