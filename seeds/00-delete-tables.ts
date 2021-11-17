import { Knex } from "knex";

const userTableName = "users";
const foodTableName = "food";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex.raw(`TRUNCATE ${userTableName} RESTART IDENTITY CASCADE`);
  await knex.raw(`TRUNCATE ${foodTableName} RESTART IDENTITY CASCADE`);
}
