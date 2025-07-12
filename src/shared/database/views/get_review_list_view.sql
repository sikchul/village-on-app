CREATE OR REPLACE VIEW get_review_list_view AS
SELECT 
  reviews.review_id,
  reviews.profile_id,
  reviews.village_id,
  reviews.review_images,
  reviews.comment,
  reviews.created_at,
  reviews.likes,
  profiles.avatar,
  profiles.nickname,
  villages.exprn_village_nm
FROM reviews
LEFT JOIN profiles ON reviews.profile_id = profiles.profile_id
LEFT JOIN villages ON reviews.village_id = villages.village_id