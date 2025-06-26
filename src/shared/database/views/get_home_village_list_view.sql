CREATE OR REPLACE VIEW get_home_village_list AS
SELECT *
FROM villages
ORDER BY 
  likes DESC,
  village_id DESC
LIMIT 5;