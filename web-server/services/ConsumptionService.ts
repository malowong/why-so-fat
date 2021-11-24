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
    const result = await this.knex(tables.CONSUMPTION)
      .join(tables.FOOD, `${tables.FOOD}.id`, `${tables.CONSUMPTION}.food_id`)
      .where(`${tables.CONSUMPTION}.user_id`, userID);
    return result;
  };

  getConsumptionDetails = async (foodId: number) => {
    const result = await this.knex.raw(`SELECT 
    c.food_id, 
    json_agg(food_photo) AS food_photo,
    json_agg(quantity) AS quantity,
    json_agg(nutrition_value) AS nutrition_value,
    json_agg(nutrition_name) AS nutrition_name,
    json_agg(total_weight) AS total_weight
    FROM consumptions c
    INNER JOIN food f
    ON c.food_id = f.id
    INNER JOIN nutrition_value v
    ON v.food_id = f.id
    INNER JOIN nutrition n
    ON n.id = v.nutrition_id
    WHERE c.user_id = ${foodId}
    GROUP BY c.food_id;`);
    return result;
  };
}
