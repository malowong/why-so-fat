import Knex from "knex";
import { UserService, User } from "../../services/UserService";
const knexConfig = require("../../knexfile");
const knex = Knex(knexConfig["test"]);
import { tables } from "../../utils/tables";

describe.only("UserService", () => {
  let service: UserService;

  async function truncateTable(tableObj: Object) {
    const keyArr = Object.keys(tableObj);
    for (let i = 0; i < keyArr.length; i++) {
      await knex.raw(/*sql*/ `TRUNCATE ${tables[keyArr[i]]} RESTART IDENTITY CASCADE`);
    }
  }

  beforeEach(async () => {
    service = new UserService(knex);
    truncateTable(tables);

    await knex(tables.USER).insert({
      username: "Denden",
      password: "159753",
      gender: "male",
      height: 153,
      weight: 80.6,
    });
  });

  it("retrive user", async () => {
    const result = (await service.getUserByUsername("Denden")) as User;
    console.log(result);
    expect(result!!.username).toEqual("Denden");
    expect(result!!.height).toBe(153);
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
