import { Knex } from "knex";
import { tables } from "../utils/freezedObj";

export class ConsumptionService {
  constructor(private knex: Knex) {}

  getConsumptionHistory = async (userID: number) => {
    const result = this.knex(tables.CONSUMPTION)
      .innerJoin(tables.FOOD, "food.id", "consumptions.food_id")
      .innerJoin(tables.NUTRITION_VALUE, "food.id", "nutrition_value.food_id")
      .innerJoin(tables.NUTRITION, "nutrition_value.nutrition_id", "nutrition.id")
      .select("*")
      //   .orderBy("created_at", "desc")
      .where("user_id", userID);

    return result;
  };

  getHomePageRecord = async (userID: number) => {
    const result = await this.knex.raw(/*SQL*/ `SELECT * FROM consumptions c
      INNER JOIN food f
      ON c.food_id = f.id
      WHERE c.user_id = ${userID}
      AND c.created_at >= current_date::timestamp
      AND c.created_at < current_date::timestamp + interval '1 day'`);
    return result;
  };

  getConsumptionDetails = async (foodID: number, userID: number) => {
    const result = await this.knex.raw(/*SQL*/ `SELECT 
    c.food_id, 
    json_agg(food_photo) AS food_photo,
    json_agg(quantity) AS quantity,
    json_agg(nutrition_value) AS nutrition_value,
    json_agg(nutrition_name) AS nutrition_name,
    json_agg(total_weight) AS total_weight,
    json_agg(food_name) AS food_name
    FROM consumptions c
    INNER JOIN food f
    ON c.food_id = f.id
    INNER JOIN nutrition_value v
    ON v.food_id = f.id
    INNER JOIN nutrition n
    ON n.id = v.nutrition_id
    WHERE c.food_id = ${foodID}
    AND c.user_id = ${userID}
    AND c.created_at >= current_date::timestamp
    AND c.created_at < current_date::timestamp + interval '1 day'
    GROUP BY c.food_id;`);
    return result;
  };

  getQuotaData = async (userID: number) => {
    const result = await this.knex.raw(/*SQL*/ `SELECT 
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
    WHERE c.user_id = ${userID}
    AND c.created_at >= current_date::timestamp
    AND c.created_at < current_date::timestamp + interval '1 day'
    GROUP BY n.nutrition_name`);
    return result;
  };

  getBodyWeight = async (userID: number) => {
    const result = await this.knex(tables.USER).where("id", userID).select("weight").first();
    return result;
  };

  addConsumption = async (foodList: any[]) => {
    await this.knex(tables.CONSUMPTION).insert(foodList);
    return true;
  };
}
