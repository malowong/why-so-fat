select v.food_id, f.food_name, f.food_photo , f.total_weight, json_agg( json_build_object('name', n.*, 'value', v.nutrition_value) ) as nutrition_details
from nutrition_value v 
left join nutrition n on n.id = v.nutrition_id 
left join food f on f.id = v.food_id
GROUP BY v.food_id, f.food_name, f.food_photo, f.total_weight
order by v.food_id ASC


--  f.food_name, f.food_photo, f.total_weight , n.*, v.nutrition_value

select  v.food_id, f.food_name, f.food_photo, f.total_weight , n.*, v.nutrition_value 
from nutrition_value v 
left join nutrition n on n.id = v.nutrition_id 
left join food f on f.id = v.food_id 
order by v.food_id ASC


SELECT * FROM users;
SELECT * FROM food;
SELECT * FROM nutrition_value;
SELECT * FROM nutrition;



SELECT 
    c.food_id, 
    json_agg(food_photo) AS food_photo,
    json_agg(quantity) AS quantity,
    json_agg(nutrition_value) AS nutrition_value,
    json_agg(nutrition_name) AS nutrition_name
    FROM consumptions c
    INNER JOIN food f
    ON c.food_id = f.id
    INNER JOIN nutrition_value v
    ON v.food_id = f.id
    INNER JOIN nutrition n
    ON n.id = v.nutrition_id
    WHERE c.user_id = 2
    GROUP BY c.food_id;