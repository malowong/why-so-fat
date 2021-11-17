import { Knex } from "knex";

const userTableName = "users";
const foodTableName = "food";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(userTableName).del();
  await knex(foodTableName).del();
}
