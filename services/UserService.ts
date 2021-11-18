import { Knex } from "knex";
import { tables } from "../utils/tables";

interface User {
  id: number;
  username: string;
  password: string;
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
    // console.log(this);
    const result = await this.knex<User>(tables.USER).where("username", username).first();
    // console.log(result);
    return result;
  }

  async insertNewUser(newUser: NewUser) {
    await this.knex<NewUser>(tables.USER).insert(newUser);
    return true;
  }
}
