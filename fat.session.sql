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
SELECT * FROM consumptions;
SELECT * FROM nutrition_value;
SELECT * FROM nutrition;

SELECT nutrition_value.nutrition_value
FROM consumptions 
INNER JOIN food ON food.id = consumptions.food_id
INNER JOIN nutrition_value ON nutrition_value.food_id = food.id
INNER JOIN nutrition ON nutrition_value.nutrition_id = nutrition.id
WHERE food.id = 28;

SELECT * FROM consumptions c
    INNER JOIN food f
    ON c.food_id = f.id
    WHERE c.user_id = ${userID}
    AND c.created_at >= current_date::timestamp
    AND c.created_at < current_date::timestamp + interval '1 day'


-- 29/11
SELECT DISTINCT ON (c.food_id, v.nutrition_value, c.quantity) c.quantity, c.food_id, c.created_at, food.food_name, v.nutrition_value, nutrition.nutrition_name
FROM consumptions c
INNER JOIN food ON food.id = c.food_id
RIGHT JOIN nutrition_value v ON food.id = v.food_id
INNER JOIN nutrition ON v.nutrition_id = nutrition.id
WHERE c.user_id = 4;

SELECT c.food_id, v.nutrition_value, c.quantity, c.food_id, c.created_at, food.food_name, v.nutrition_value, nutrition.nutrition_name
FROM consumptions c
INNER JOIN food ON food.id = c.food_id
RIGHT JOIN nutrition_value v ON food.id = v.food_id
INNER JOIN nutrition ON v.nutrition_id = nutrition.id
WHERE c.user_id = 4;

----

SELECT * 
FROM consumptions c
INNER JOIN food f ON c.food_id = f.id
WHERE c.user_id = 4
AND c.created_at >= current_date::timestamp
AND c.created_at < current_date::timestamp + interval '1 day';


-- api/consumption/history
-- SELECT DISTINCT ON (c.food_id, v.nutrition_value) c.quantity, c.food_id, c.created_at, food.food_name, v.nutrition_value, nutrition.nutrition_name, food.total_weight
--     FROM consumptions c
--     INNER JOIN food ON food.id = c.food_id
--     RIGHT JOIN nutrition_value v ON food.id = v.food_id
--     INNER JOIN nutrition ON v.nutrition_id = nutrition.id
--     WHERE c.user_id = 4;


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
    AND c.created_at >= current_date::timestamp 
    AND c.created_at < current_date::timestamp + interval '1 day' 
    GROUP BY c.food_id;


    insert into consumptions (quantity, user_id, food_id) VALUES (1/3, 2, 1);
    insert into consumptions (quantity, user_id, food_id) VALUES (2, 1, 2);
        insert into consumptions (quantity, user_id, food_id) VALUES (3, 2, 4);


insert into food (food_name, food_photo, total_weight, created_at) values ('薯片3', 'test.jpg', 100, current_date::timestamp - interval '1 day');

delete from consumptions where created_at >= current_date::timestamp AND created_at < current_date::timestamp + interval '1 day';