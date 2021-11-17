import { Knex } from "knex";
import { hashPassword } from "../utils/hash";

const userTableName = "users";

const users = [
  {
    username: "billy",
    password: "1234",
    gender: "male",
    age: 40,
    height: 165,
    weight: 80.5,
  },
  {
    username: "dennis",
    password: "1234",
    gender: "male",
    age: 18,
    height: 175,
    weight: 64,
  },
  {
    username: "matthew",
    password: "1234",
    gender: "male",
    age: 25,
    height: 173,
    weight: 58,
  },
  {
    username: "maggie",
    password: "1234",
    gender: "female",
    age: 30,
    height: 190,
    weight: 72,
  },
];

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries

  const data = await Promise.all(
    users.map(async (user) => ({
      ...user,
      password: await hashPassword(user.password),
    }))
  );

  await knex(userTableName).insert(data);
}
