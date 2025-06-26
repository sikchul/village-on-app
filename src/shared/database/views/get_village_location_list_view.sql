DROP VIEW IF EXISTS get_village_location_list;

CREATE VIEW get_village_location_list AS
SELECT institution_nm
FROM (
  SELECT DISTINCT institution_nm
  FROM villages
  WHERE institution_nm != ''
) AS unique_institutions
ORDER BY 
  institution_nm COLLATE "C";
