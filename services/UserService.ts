import { Knex } from "knex";
import { tables } from "../utils/tables";

export interface User {
  id: number;
  username: string;
  password: string;
  gender: string;
  height: number;
  weight: number;
  created_at: Date;
  updated_at: Date;
}

interface NewUser {
  username: string;
  password: string;
  gender: string;
  height: number;
  weight: number;
}

export class UserService {
  constructor(private knex: Knex) {}

  async getUserByUsername(username: string) {
    const result = await this.knex<User>(tables.USER).where("username", username).first();
    return result;
  }

  async getUserProfile(userID: number) {
    const result = await this.knex<User>("users").where("id", userID).first();
    return result;
  }

  async insertNewUser(newUser: NewUser) {
    await this.knex(tables.USER).insert(newUser);
    return true;
  }
}
