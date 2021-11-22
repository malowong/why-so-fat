import { Knex } from "knex";
import { Request } from "express";
import { tables } from "../utils/freezedObj";
// import { Food } from "../utils/models";

export class FoodService {
  constructor(private knex: Knex) {}

  getFoodInfo = async () => {
    const result = await this.knex.raw(
      /*SQL*/ `select  v.food_id, f.food_name, f.food_photo, f.total_weight , n.*, v.nutrition_value, v.per_unit  from nutrition_value v left join nutrition n on n.id = v.nutrition_id left join food f on f.id = v.food_id order by v.food_id ASC`
    );

    return result;
  };

  upload = async (reqObj: Request) => {
    const userInput = {
      food_name: reqObj.body.food_name,
      food_photo: reqObj.file?.filename,
      total_weight: reqObj.body.total_weight,
    };

    await this.knex(tables.FOOD).insert(userInput);
    return true;
  };
}
