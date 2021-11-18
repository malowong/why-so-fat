import { Knex } from "knex";
import { Food } from "../utils/models";

export class FoodService {
  constructor(private knex: Knex) {}

  async getFoodInfo(userID: number) {
    const result = await this.knex<Food>("food").where("user_id", userID);

    return result;
  }
}
