import { Knex } from "knex";
import { tables } from "../utils/freezedObj";

export async function seed(knex: Knex): Promise<void> {
  async function truncateTable(tableObj: Object) {
    const keyArr = Object.values(tableObj);

    for (let i = 0; i < keyArr.length; i++) {
      await trx.raw(/*sql*/ `TRUNCATE ${keyArr[i]} RESTART IDENTITY CASCADE`);
    }
  }

  const trx = await knex.transaction();
  try {
    await truncateTable(tables);
    await trx.commit();
  } catch (err) {
    console.error(err.message);
    await trx.rollback();
  } finally {
    await trx.destroy();
  }

}
