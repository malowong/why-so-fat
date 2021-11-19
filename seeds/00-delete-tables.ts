import { Knex } from "knex";
import { tables } from "../utils/tables";

export async function seed(knex: Knex): Promise<void> {
  async function truncateTable(tableObj: Object) {
    const keyArr = Object.values(tableObj);
    console.log(keyArr);
    for (let i = 0; i < keyArr.length; i++) {
      console.log(keyArr[i]);
      await knex.raw(/*sql*/ `TRUNCATE ${keyArr[i]} RESTART IDENTITY CASCADE`);
    }
  }

  // const trx = await knex.transaction();
  // try {
  await truncateTable(tables);

  // await trx(....).insert(...)
  //   await trx.commit();
  // } catch (err) {
  //   console.error(err.message);
  //   await trx.rollback();
  // } finally {
  //   await trx.destroy();
  // }

  // Deletes ALL existing entries
  // await knex.raw(`TRUNCATE ${tables.USER} RESTART IDENTITY CASCADE`);
  // await knex.raw(`TRUNCATE ${tables.FOOD} RESTART IDENTITY CASCADE`);
  // await knex.raw(`TRUNCATE ${tables.NUTRITION} RESTART IDENTITY CASCADE`);
  // await knex.raw(`TRUNCATE ${tables.CONSUMPTION} RESTART IDENTITY CASCADE`);
  // await knex.raw(`TRUNCATE ${tables.NUTRITION_VALUE} RESTART IDENTITY CASCADE`);
}
