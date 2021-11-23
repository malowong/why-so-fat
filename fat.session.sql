select v.food_id, f.food_name, f.food_photo , f.total_weight, json_agg( json_build_object('name', n.*, 'value', v.nutrition_value) ) as nutrition_details
from nutrition_value v 
left join nutrition n on n.id = v.nutrition_id 
left join food f on f.id = v.food_id
GROUP BY v.food_id, f.food_name, f.food_photo, f.total_weight
order by v.food_id ASC


--  f.food_name, f.food_photo, f.total_weight , n.*, v.nutrition_value

select  v.food_id, f.food_name, f.food_photo, f.total_weight , n.*, v.nutrition_value from nutrition_value v left join nutrition n on n.id = v.nutrition_id left join food f on f.id = v.food_id order by v.food_id ASC