DROP VIEW IF EXISTS get_village_type_list;

CREATE VIEW get_village_type_list AS
WITH RECURSIVE split_types AS (
  SELECT 
    village_id,
    exprn_se,
    split_part(exprn_se, '+', 1) AS type_item,
    1 AS position,
    array_length(string_to_array(exprn_se, '+'), 1) AS total_items
  FROM villages
  WHERE exprn_se != ''
  
  UNION ALL
  
  SELECT 
    st.village_id,
    st.exprn_se,
    split_part(st.exprn_se, '+', st.position + 1) AS type_item,
    st.position + 1,
    st.total_items
  FROM split_types st
  WHERE st.position < st.total_items
),
distinct_types AS (
  SELECT DISTINCT TRIM(type_item) AS type_name
  FROM split_types
  WHERE TRIM(type_item) != ''
)
SELECT type_name
FROM (
  SELECT DISTINCT type_name
  FROM distinct_types
) AS unique_types
ORDER BY 
  CASE WHEN type_name = '기타' THEN 1 ELSE 0 END,
  type_name COLLATE "C";
