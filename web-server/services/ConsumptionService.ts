import { Knex } from "knex";
import { tables } from "../utils/freezedObj";

export class ConsumptionService {
  constructor(private knex: Knex) {}

  getConsumptionHistory = async (userID: number) => {
    const result = this.knex.raw(
      /*SQL*/ `SELECT DISTINCT ON (c.id, v.nutrition_value) c.quantity, c.food_id, c.created_at, food.food_name, v.nutrition_value, nutrition.nutrition_name, food.total_weight
    FROM consumptions c
    INNER JOIN food ON food.id = c.food_id
    RIGHT JOIN nutrition_value v ON food.id = v.food_id
    INNER JOIN nutrition ON v.nutrition_id = nutrition.id
    WHERE c.user_id =?`,
      [userID]
    );

    return result;
  };

  getHomePageRecord = async (userID: number) => {
    const result = await this.knex.raw(
      /*SQL*/ `
    WITH total_qty AS (SELECT f.id, sum(c.quantity) 
      FROM consumptions c
      INNER JOIN food f
      ON c.food_id = f.id
      WHERE c.user_id =?
      AND c.created_at >= current_date::timestamp
      AND c.created_at < current_date::timestamp + interval '1 day'
      GROUP BY f.id)
    SELECT DISTINCT ON (f.id) f.id, f.food_name, t.sum, c.user_id
 FROM consumptions c
      INNER JOIN food f
      ON c.food_id = f.id
      INNER JOIN total_qty t
      ON t.id = c.food_id
      WHERE c.user_id = ?
      AND c.created_at >= current_date::timestamp
      AND c.created_at < current_date::timestamp + interval '1 day'`,
      [userID, userID]
    );
    return result;
  };

  getConsumptionDetails = async (foodID: number, userID: number) => {
    const result = await this.knex.raw(
      /*SQL*/ `SELECT 
    c.food_id, 
    json_agg(food_photo) AS food_photo,
    json_agg(quantity) AS quantity,
    json_agg(nutrition_value) AS nutrition_value,
    json_agg(nutrition_name) AS nutrition_name,
    json_agg(total_weight) AS total_weight,
    json_agg(food_name) AS food_name
    FROM consumptions c
    INNER JOIN food f
    ON f.id = c.food_id
    INNER JOIN nutrition_value v
    ON v.food_id = f.id
    INNER JOIN nutrition n
    ON n.id = v.nutrition_id
    WHERE c.food_id = ?
    AND c.user_id = ?
    AND c.created_at >= current_date::timestamp
    AND c.created_at < current_date::timestamp + interval '1 day'
    GROUP BY c.food_id`,
      [foodID, userID]
    );
    return result;
  };

  getQuotaData = async (userID: number) => {
    const result = await this.knex.raw(
      /*SQL*/ `SELECT 
    n.nutrition_name, 
    json_agg(quantity) AS quantity,
    json_agg(nutrition_value) AS nutrition_value,
    json_agg(total_weight) AS total_weight,
    json_agg(food_name) AS food_name,
    json_agg(weight) AS weight
    FROM consumptions c
    INNER JOIN food f
    ON c.food_id = f.id
    INNER JOIN nutrition_value v
    ON v.food_id = f.id
    INNER JOIN nutrition n
    ON n.id = v.nutrition_id
    INNER JOIN users u
    ON u.id = c.user_id
    WHERE c.user_id = ?
    AND c.created_at >= current_date::timestamp
    AND c.created_at < current_date::timestamp + interval '1 day'
    GROUP BY n.nutrition_name`,
      [userID]
    );
    return result;
  };

  getStandardInfo = async (userID: number) => {
    const result = await this.knex(tables.USER).where("id", userID).first();
    return result;
  };

  addConsumption = async (foodInfo: Object, userID: number) => {
    const foodIdArr = Object.keys(foodInfo);
    for (const i in foodIdArr) {
      if (foodInfo[foodIdArr[i]] == 0) {
      } else {
        const foodList = {
          quantity: foodInfo[foodIdArr[i]],
          user_id: userID,
          food_id: Number(foodIdArr[i]),
        };
        await this.knex(tables.CONSUMPTION).insert(foodList);
      }
    }
    return true;
  };

  deleteRecord = async (foodID: number, userID: number) => {
    await this.knex.raw(
      /*SQL*/ `
    DELETE FROM ${tables.CONSUMPTION}
    WHERE user_id = ?
    AND food_id = ?
    AND created_at >= current_date::timestamp
    AND created_at < current_date::timestamp + interval '1 day'`,
      [userID, foodID]
    );

    return true;
  };
}
