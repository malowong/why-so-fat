import { Knex } from "knex";

const tables = Object.freeze({
  USER: "users",
  FOOD: "food",
  CONSUMPTION: "consumptions",
  NUTRITION_VALUE: "nutrition_value",
  NUTRITION: "nutrition",
});

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tables.USER, (table) => {
    table.increments();
    table.string("username", 20).notNullable().unique();
    table.string("password").notNullable();
    table.string("gender", 10).notNullable();
    table.float("height").notNullable().unsigned();
    table.float("weight").notNullable().unsigned();
    table.integer("energy_intake").notNullable().unsigned();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(tables.FOOD, (table) => {
    table.increments();
    table.string("food_name").notNullable().unique();
    table.string("food_photo").notNullable();
    table.float("total_weight").notNullable().unsigned();
    table.timestamps(false, true);
  });

  await knex.schema.createTable(tables.NUTRITION, (table) => {
    table.increments();
    table.string("nutrition_name", 20).notNullable();
  });

  await knex.schema.createTable(tables.CONSUMPTION, (table) => {
    table.increments();
    table.float("quantity").notNullable().unsigned();
    table.integer("user_id").unsigned();
    table.foreign("user_id").references(`${tables.USER}.id`);
    table.integer("food_id").unsigned();
    table.foreign("food_id").references(`${tables.FOOD}.id`);
    table.timestamps(false, true);
  });

  await knex.schema.createTable(tables.NUTRITION_VALUE, (table) => {
    table.increments();
    table.float("nutrition_value").notNullable().unsigned();
    table.integer("food_id").notNullable();
    table.foreign("food_id").references(`${tables.FOOD}.id`);
    table.integer("nutrition_id").notNullable();
    table.foreign("nutrition_id").references(`${tables.NUTRITION}.id`);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tables.NUTRITION_VALUE);
  await knex.schema.dropTable(tables.CONSUMPTION);
  await knex.schema.dropTable(tables.NUTRITION);
  await knex.schema.dropTable(tables.FOOD);
  await knex.schema.dropTable(tables.USER);
}
