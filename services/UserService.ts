import { Knex } from "knex";

interface User {
  id: number;
  username: string;
  password: string;
}

export class UserService {
  constructor(private knex: Knex) {}

  async getUserByUsername(username: string) {
    // console.log(this);
    const result = await this.knex<User>("users").where("username", username).first();
    // console.log(result);
    return result;
  }
}
