import { Knex } from "knex";

interface User {
  username: string;
  password: string | number;
}

export class UserService {
  constructor(private knex: Knex) {}

  async getUserByUsername(username: string, password: string | number) {
    const result = await this.knex<User>("users").where("username", username).first();
    return result;
  }
}
