import Knex from "knex";
import { tables } from "./freezedObj";

const knexConfig = require("../knexfile");
const knex = Knex(knexConfig["test"]);

export async function truncateTable(tableObj: Object) {
  const keyArr = Object.keys(tableObj);
  for (let i = 0; i < keyArr.length; i++) {
    await knex.raw(/*sql*/ `TRUNCATE ${tables[keyArr[i]]} RESTART IDENTITY CASCADE`);
  }
}
