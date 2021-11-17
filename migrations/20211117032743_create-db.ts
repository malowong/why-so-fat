import { Knex } from "knex";

const userTableName = "users";
const foodTableName = "food";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(userTableName, (table) => {
    table.increments();
    table.string("username", 20).notNullable().unique();
    table.string("password").notNullable();
    table.string("gender", 10).notNullable();
    table.string("age", 10).notNullable();
    table.float("height").notNullable();
    table.float("weight").notNullable();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(foodTableName, (table) => {
    table.increments();
    table.string("food_name").notNullable().unique();
    table.string("food_photo").notNullable();
    table.float("energy");
    table.float("protein");
    table.float("total_fat");
    table.float("saturated_fat");
    table.float("trans_fat");
    table.float("carbohydrates");
    table.float("sodium");
    table.integer("user_id");
    table.foreign("user_id").references(`${userTableName}.id`);
    table.timestamps(false, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(foodTableName);
  await knex.schema.dropTable(userTableName);
}
