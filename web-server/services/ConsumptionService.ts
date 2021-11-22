import { Knex } from "knex";
import { tables } from "../utils/freezedObj";

export class ConsumptionService {
  constructor(private knex: Knex) {}

  getConsumptionHistory = async (userID: number) => {
    const result = this.knex(tables.CONSUMPTION)
      .innerJoin(tables.FOOD, "food.id", "consumptions.food_id")
      .select("quantity", "food_id")
      //   .orderBy("created_at", "desc")
      .where("user_id", userID);

    return result;
  };
}
