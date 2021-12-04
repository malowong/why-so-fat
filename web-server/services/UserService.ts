import { Knex } from "knex";
import { tables } from "../utils/freezedObj";
import { User, NewUser } from "./models";

export class UserService {
  constructor(private knex: Knex) {}

  getUserByUsername = async (username: string) => {
    const result = await this.knex<User>(tables.USER).where("username", username).first();
    return result;
  };

  getUserProfile = async (userID: number) => {
    const result = await this.knex<User>(tables.USER).where("id", userID).first();
    return result;
  };

  editUserProfile = async (userID: number, height: number, weight: number, energy_intake: number) => {
    await this.knex(tables.USER)
      .update({
        height,
        weight,
        energy_intake,
      })
      .where("id", userID);

    return true;
  };

  insertNewUser = async (newUser: NewUser) => {
    const newUserID = await this.knex(tables.USER).insert(newUser).returning("id");
    return newUserID;
  };
}
