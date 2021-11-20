import Knex from "knex";
import { UserService, User } from "../../services/UserService";
import { tables } from "../../utils/freezedObj";
import { truncateTable } from "../../utils/truncateTable";
const knexConfig = require("../../knexfile");
const knex = Knex(knexConfig["test"]);

describe.only("UserService", () => {
  let service: UserService;

  beforeEach(async () => {
    service = new UserService(knex);
    await truncateTable(tables);

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
