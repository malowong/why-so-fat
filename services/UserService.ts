import { Knex } from "knex";

interface User {
  id: number;
  username: string;
  password: string;
}

export class UserService {
  constructor(private knex: Knex) {}

  async getUserByUsername(username: string) {
    const result = await this.knex<User>("users").where("username", username).first();
    return result;
  }

  async getUserProfile(userID: number) {
    const result = await this.knex<User>("users").where("id", userID).first();
    return result;
  }
}
