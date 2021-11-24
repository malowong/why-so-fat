import { Knex } from "knex";
import { tables } from "../utils/freezedObj";
import { User, NewUser, Consumptions } from "../utils/models";

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

  editUserProfile = async (userID: number, height: number, weight: number) => {
    await this.knex(tables.USER)
      .update({
        height,
        weight,
      })
      .where("id", userID);

    return true;
  };

  insertNewUser = async (newUser: NewUser) => {
    await this.knex(tables.USER).insert(newUser);
    return true;
  };

  getHomePageRecord = async (userID: number) => {
    const result = await this.knex<Consumptions>(tables.CONSUMPTION)
      .join(tables.FOOD, `${tables.FOOD}.id`, `${tables.CONSUMPTION}.food_id`)
      .where(`${tables.CONSUMPTION}.user_id`, userID);
    return result;
  };
}
