import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

const userTableName = "users";
const foodTableName = "food";

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
  {
    food_name: "魚仔餅",
    food_photo: "1.jpg",
    energy: 500,
    protein: 10.8,
    total_fat: 4.7,
    saturated_fat: 5,
    trans_fat: 5.5,
    carbohydrates: 52.3,
    sodium: 230,
    user_id: 1,
  },
  {
    food_name: "可口可樂",
    food_photo: "2.jpg",
    energy: 500,
    protein: 10.8,
    total_fat: 4.7,
    saturated_fat: 5,
    trans_fat: 5.5,
    carbohydrates: 52.3,
    sodium: 230,
    user_id: 3,
  },
  {
    food_name: "益達無糖香口膠",
    food_photo: "3.jpg",
    energy: 500,
    protein: 10.8,
    total_fat: 4.7,
    saturated_fat: 5,
    trans_fat: 5.5,
    carbohydrates: 52.3,
    sodium: 230,
    user_id: 4,
  },
  {
    food_name: "金莎朱古力",
    food_photo: "4.jpg",
    energy: 500,
    protein: 10.8,
    total_fat: 4.7,
    saturated_fat: 5,
    trans_fat: 5.5,
    carbohydrates: 52.3,
    sodium: 230,
    user_id: 4,
  },
];

if (0) {
  console.log(food, foodTableName);
}

export async function seed(knex: Knex): Promise<void> {
  const userData = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password),
    }))
  );

  await knex(userTableName).insert(userData);
  await knex(foodTableName).insert(food);
}
