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
    energy_intake: 2000,
  },
  {
    username: "dennis",
    password: "1234",
    gender: "male",
    height: 175,
    weight: 64,
    energy_intake: 1800,
  },
  {
    username: "matthew",
    password: "1234",
    gender: "male",
    height: 173,
    weight: 58,
    energy_intake: 1700,
  },
  {
    username: "maggie",
    password: "1234",
    gender: "female",
    height: 190,
    weight: 72,
    energy_intake: 1500,
  },
];

const food = [
  { food_name: "可樂味味覺糖", food_photo: "1.jpeg", total_weight: 25 },
  { food_name: "可口可樂", food_photo: "2.jpeg", total_weight: 250 },
  { food_name: "金莎朱古力", food_photo: "3.jpg", total_weight: 17 },
  { food_name: "卡樂B薯條", food_photo: "4.jpg", total_weight: 43 },
  { food_name: "百力滋", food_photo: "5.jpeg", total_weight: 43 },
  { food_name: "夜店之燒炒麵", food_photo: "6.jpeg", total_weight: 130 },
  { food_name: "燒烤味栗一燒", food_photo: "7.jpeg", total_weight: 32 },
  { food_name: "出前一丁麻油味杯麵", food_photo: "8.jpeg", total_weight: 99 },
];

const nutrition = [
  { nutrition_name: "energy" },
  { nutrition_name: "protein" },
  { nutrition_name: "total_fat" },
  { nutrition_name: "saturated_fat" },
  { nutrition_name: "trans_fat" },
  { nutrition_name: "carbohydrates" },
  { nutrition_name: "sugars" },
  { nutrition_name: "sodium" },
];

const consumptions = [
  { quantity: 0.25, user_id: 1, food_id: 2 },
  { quantity: 1, user_id: 1, food_id: 6 },
  { quantity: 1, user_id: 1, food_id: 4 },
  { quantity: 0.5, user_id: 1, food_id: 1 },
  { quantity: 1, user_id: 1, food_id: 3 },
  { quantity: 1, user_id: 1, food_id: 1 },
  { quantity: 1, user_id: 1, food_id: 2 },
];

const nutrition_value1 = [
  { nutrition_value: 332, food_id: 1, nutrition_id: 1 },
  { nutrition_value: 12.4, food_id: 1, nutrition_id: 2 },
  { nutrition_value: 0.7, food_id: 1, nutrition_id: 3 },
  { nutrition_value: 0, food_id: 1, nutrition_id: 4 },
  { nutrition_value: 0, food_id: 1, nutrition_id: 5 },
  { nutrition_value: 64.8, food_id: 1, nutrition_id: 6 },
  { nutrition_value: 45.5, food_id: 1, nutrition_id: 7 },
  { nutrition_value: 43, food_id: 1, nutrition_id: 8 },
];

const nutrition_value2 = [
  { nutrition_value: 42, food_id: 2, nutrition_id: 1 },
  { nutrition_value: 0, food_id: 2, nutrition_id: 2 },
  { nutrition_value: 0, food_id: 2, nutrition_id: 3 },
  { nutrition_value: 0, food_id: 2, nutrition_id: 4 },
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

const nutrition_value5 = [
  { nutrition_value: 519, food_id: 5, nutrition_id: 1 },
  { nutrition_value: 8.4, food_id: 5, nutrition_id: 2 },
  { nutrition_value: 23.9, food_id: 5, nutrition_id: 3 },
  { nutrition_value: 9.7, food_id: 5, nutrition_id: 4 },
  { nutrition_value: 0.2, food_id: 5, nutrition_id: 5 },
  { nutrition_value: 65.8, food_id: 5, nutrition_id: 6 },
  { nutrition_value: 14.7, food_id: 5, nutrition_id: 7 },
  { nutrition_value: 368, food_id: 5, nutrition_id: 8 },
];

const nutrition_value6 = [
  { nutrition_value: 445, food_id: 6, nutrition_id: 1 },
  { nutrition_value: 7.09, food_id: 6, nutrition_id: 2 },
  { nutrition_value: 20.63, food_id: 6, nutrition_id: 3 },
  { nutrition_value: 11, food_id: 6, nutrition_id: 4 },
  { nutrition_value: 1.5, food_id: 6, nutrition_id: 5 },
  { nutrition_value: 55.77, food_id: 6, nutrition_id: 6 },
  { nutrition_value: 8, food_id: 6, nutrition_id: 7 },
  { nutrition_value: 1597.3, food_id: 6, nutrition_id: 8 },
];

const nutrition_value7 = [
  { nutrition_value: 522, food_id: 7, nutrition_id: 1 },
  { nutrition_value: 5.9, food_id: 7, nutrition_id: 2 },
  { nutrition_value: 28.3, food_id: 7, nutrition_id: 3 },
  { nutrition_value: 13.9, food_id: 7, nutrition_id: 4 },
  { nutrition_value: 0, food_id: 7, nutrition_id: 5 },
  { nutrition_value: 62.8, food_id: 7, nutrition_id: 6 },
  { nutrition_value: 4.7, food_id: 7, nutrition_id: 7 },
  { nutrition_value: 612, food_id: 7, nutrition_id: 8 },
];

const nutrition_value8 = [
  { nutrition_value: 417.17172, food_id: 8, nutrition_id: 1 },
  { nutrition_value: 10.909091, food_id: 8, nutrition_id: 2 },
  { nutrition_value: 15.757576, food_id: 8, nutrition_id: 3 },
  { nutrition_value: 10.30303, food_id: 8, nutrition_id: 4 },
  { nutrition_value: 0, food_id: 8, nutrition_id: 5 },
  { nutrition_value: 58.38384, food_id: 8, nutrition_id: 6 },
  { nutrition_value: 4.7474747, food_id: 8, nutrition_id: 7 },
  { nutrition_value: 2530.303, food_id: 8, nutrition_id: 8 },
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
    await trx(tables.NUTRITION_VALUE).insert(nutrition_value5);
    await trx(tables.NUTRITION_VALUE).insert(nutrition_value6);
    await trx(tables.NUTRITION_VALUE).insert(nutrition_value7);
    await trx(tables.NUTRITION_VALUE).insert(nutrition_value8);

    await trx(tables.CONSUMPTION).insert(consumptions);

    await trx.raw(/* sql */ `
      UPDATE consumptions
      SET created_at = current_date::timestamp - interval '1 day',
      updated_at = current_date::timestamp - interval '1 day'
      WHERE consumptions.food_id = 6
    `);

    await trx.raw(/* sql */ `
      UPDATE consumptions
      SET created_at = current_date::timestamp - interval '2 day',
      updated_at = current_date::timestamp - interval '2 day'
      WHERE consumptions.food_id = 4
    `);

    await trx.raw(/* sql */ `
      UPDATE consumptions
      SET created_at = current_date::timestamp - interval '2 day',
      updated_at = current_date::timestamp - interval '2 day'
      WHERE consumptions.food_id = 3
    `);

    await trx.raw(/* sql */ `
      UPDATE consumptions
      SET created_at = current_date::timestamp - interval '3 day',
      updated_at = current_date::timestamp - interval '3 day'
      WHERE consumptions.food_id = 2
    `);

    await trx.raw(/* sql */ `
      UPDATE consumptions
      SET created_at = current_date::timestamp - interval '3 day',
      updated_at = current_date::timestamp - interval '3 day'
      WHERE consumptions.food_id = 1
    `);

    await trx.commit();
  } catch (err) {
    console.error(err.message);
    await trx.rollback();
  } finally {
    await trx.destroy();
  }
}
