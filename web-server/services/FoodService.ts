import { Knex } from "knex";
import { Request } from "express";
import { tables } from "../utils/freezedObj";
// import { Food } from "../utils/models";

export class FoodService {
  constructor(private knex: Knex) {}

  getFoodInfo = async () => {
    const result = await this.knex.raw(
      /*SQL*/ `select  v.food_id, f.food_name, f.food_photo, f.total_weight , n.*, v.nutrition_value from nutrition_value v left join nutrition n on n.id = v.nutrition_id left join food f on f.id = v.food_id order by v.food_id ASC`
    );

    return result;
  };

  upload = async (reqObj: Request) => {
    const body = reqObj.body;
    console.log(body);
    console.log(reqObj);
    console.log(`filename:${reqObj.file?.filename}`);
    console.log(`weight:${body.total_weight}`);

    const userInput = {
      food_name: body.food_name,
      food_photo: String(reqObj.file?.filename),
      total_weight: parseInt(body.total_weight),
    };

    const nutritionArr = await this.knex(tables.NUTRITION).select();
    const nutritionMap = new Map<number, string>();
    for (const nutrition of nutritionArr) {
      nutritionMap.set(nutrition.id, nutrition.nutrition_name);
    }

    const foodID = await this.knex(tables.FOOD).insert(userInput).returning("id");
    console.log(`foodID:${foodID}`);

    if (body.per_unit == "per_package") {
      for (let i = 1; i <= nutritionMap.size; i++) {
        const nutritionValue = {
          nutrition_value: (body[`${nutritionMap.get(i)}`] / body["total_weight"]) * 100,
          food_id: Number(foodID),
          nutrition_id: i,
        };
        await this.knex(tables.NUTRITION_VALUE).insert(nutritionValue);
      }
    } else if (body.per_unit == "per_serving") {
      for (let i = 1; i <= nutritionMap.size; i++) {
        const nutritionValue = {
          nutrition_value: (body[`${nutritionMap.get(i)}`] / body["serving_size"]) * 100,
          food_id: Number(foodID),
          nutrition_id: i,
        };
        await this.knex(tables.NUTRITION_VALUE).insert(nutritionValue);
      }
    } else {
      for (let i = 1; i <= nutritionMap.size; i++) {
        for (let i = 1; i <= nutritionMap.size; i++) {
          const nutritionValue = {
            nutrition_value: body[`${nutritionMap.get(i)}`],
            food_id: Number(foodID),
            nutrition_id: i,
          };
          await this.knex(tables.NUTRITION_VALUE).insert(nutritionValue);
        }
      }
    }

    if (body.is_consumed == "YES") {
      const consumptions = {
        quantity: body["quantity"] * body["total_weight"],
        user_id: reqObj.session["user"].id,
        food_id: Number(foodID),
      };
      await this.knex(tables.CONSUMPTION).insert(consumptions);
    }

    return true;
  };

  convert = async (foodId: Number) => {
    const result = await this.knex(tables.NUTRITION_VALUE)
      .join(tables.NUTRITION, `${tables.NUTRITION}.id`, `${tables.NUTRITION_VALUE}.nutrition_id`)
      .select("*")
      .where(`${tables.NUTRITION_VALUE}.food_id`, foodId);

    return result;
  };

  // getHomePageFoodDetail
}
