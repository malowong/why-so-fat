import { Knex } from "knex";

export class FoodService {
  constructor(private knex: Knex) {}

  async getFoodInfo(userID: number) {
    const result = await this.knex("food").where("user_id", userID);

    return result;
  }
}
