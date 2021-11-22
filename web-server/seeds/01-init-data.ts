import { Knex } from "knex";
import { hashPassword } from "../utils/hash";
import { tables } from "../utils/freezedObj";

const users = [
  {
    username: "billy",
    password: "1234",
    gender: "male",
    height: 165,
    weight: 80.5,
  },
  {
    username: "dennis",
    password: "1234",
    gender: "male",
    height: 175,
    weight: 64,
  },
  {
    username: "matthew",
    password: "1234",
    gender: "male",
    height: 173,
    weight: 58,
  },
  {
    username: "maggie",
    password: "1234",
    gender: "female",
    height: 190,
    weight: 72,
  },
];

const food = [
  { food_name: "魚仔餅", food_photo: "1.jpg", total_weight: 33 },
  { food_name: "可口可樂", food_photo: "2.jpg", total_weight: 250 },
  { food_name: "金莎朱古力", food_photo: "3.jpg", total_weight: 17 },
  { food_name: "卡樂B薯條", food_photo: "4.jpg", total_weight: 43 },
];

const nutrition = [
  { nutrition_name: "Energy" },
  { nutrition_name: "Protein" },
  { nutrition_name: "Total fat" },
  { nutrition_name: "Saturated fat" },
  { nutrition_name: "Trans fat" },
  { nutrition_name: "Carbohydrates" },
  { nutrition_name: "Sugars" },
  { nutrition_name: "Sodium" },
];

const consumptions = [
  { quantity: 0.25, user_id: 3, food_id: 2 },
  { quantity: 1, user_id: 2, food_id: 4 },
  { quantity: 0.5, user_id: 1, food_id: 1 },
  { quantity: 1, user_id: 4, food_id: 3 },
  { quantity: 1, user_id: 4, food_id: 1 },
  { quantity: 1, user_id: 4, food_id: 2 },
];

const nutrition_value1 = [
  { nutrition_value: 405, food_id: 1, nutrition_id: 1 },
  { nutrition_value: 5.3, food_id: 1, nutrition_id: 2 },
  { nutrition_value: 11.8, food_id: 1, nutrition_id: 3 },
  { nutrition_value: 5.5, food_id: 1, nutrition_id: 4 },
  { nutrition_value: 69, food_id: 1, nutrition_id: 6 },
  { nutrition_value: 10.8, food_id: 1, nutrition_id: 7 },
  { nutrition_value: 748, food_id: 1, nutrition_id: 8 },
];

const nutrition_value2 = [
  { nutrition_value: 42, food_id: 2, nutrition_id: 1 },
  { nutrition_value: 10.6, food_id: 2, nutrition_id: 6 },
  { nutrition_value: 10.6, food_id: 2, nutrition_id: 7 },
  { nutrition_value: 4, food_id: 2, nutrition_id: 8 },
];

const nutrition_value3 = [
  { nutrition_value: 325, food_id: 3, nutrition_id: 1 },
  { nutrition_value: 5.3, food_id: 3, nutrition_id: 2 },
  { nutrition_value: 35, food_id: 3, nutrition_id: 3 },
  { nutrition_value: 12, food_id: 3, nutrition_id: 4 },
  { nutrition_value: 12, food_id: 3, nutrition_id: 5 },
  { nutrition_value: 2, food_id: 3, nutrition_id: 6 },
  { nutrition_value: 15, food_id: 3, nutrition_id: 7 },
  { nutrition_value: 9, food_id: 3, nutrition_id: 8 },
];

const nutrition_value4 = [
  { nutrition_value: 125, food_id: 4, nutrition_id: 1 },
  { nutrition_value: 5.3, food_id: 4, nutrition_id: 2 },
  { nutrition_value: 35, food_id: 4, nutrition_id: 3 },
  { nutrition_value: 23, food_id: 4, nutrition_id: 4 },
  { nutrition_value: 19, food_id: 4, nutrition_id: 5 },
  { nutrition_value: 2, food_id: 4, nutrition_id: 6 },
  { nutrition_value: 15, food_id: 4, nutrition_id: 7 },
  { nutrition_value: 9, food_id: 4, nutrition_id: 8 },
];

export async function seed(knex: Knex): Promise<void> {
  const userData = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password),
    }))
  );

  const trx = await knex.transaction();
  try {
    await trx(tables.USER).insert(userData);
    await trx(tables.FOOD).insert(food);
    await trx(tables.NUTRITION).insert(nutrition);
    await trx(tables.NUTRITION_VALUE).insert(nutrition_value1);
    await trx(tables.NUTRITION_VALUE).insert(nutrition_value2);
    await trx(tables.NUTRITION_VALUE).insert(nutrition_value3);
    await trx(tables.NUTRITION_VALUE).insert(nutrition_value4);
    await trx(tables.CONSUMPTION).insert(consumptions);
    await trx.commit();
  } catch (err) {
    console.error(err.message);
    await trx.rollback();
  } finally {
    await trx.destroy();
  }
}
