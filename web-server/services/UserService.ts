import { Knex } from "knex";
import { tables } from "../utils/freezedObj";

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

  getUserByUsername = async (username: string) => {
    const result = await this.knex<User>(tables.USER).where("username", username).first();
    return result;
  };

  getUserProfile = async (userID: number) => {
    const result = await this.knex<User>("users").where("id", userID).first();
    return result;
  };

  insertNewUser = async (newUser: NewUser) => {
    await this.knex(tables.USER).insert(newUser);
    return true;
  };
}
