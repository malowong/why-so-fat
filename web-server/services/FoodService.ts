import { Knex } from "knex";
import { Request } from "express";
import { tables } from "../utils/freezedObj";

export class FoodService {
  constructor(private knex: Knex) {}

  getFoodNameList = async () => {
    const result = await this.knex(tables.FOOD).select("*");

    return result;
  };

  getFoodAndNutritionInfo = async () => {
    const result = await this.knex.raw(
      /*SQL*/ `select  v.food_id, f.food_name, f.food_photo, f.total_weight , n.*, v.nutrition_value from nutrition_value v left join nutrition n on n.id = v.nutrition_id left join food f on f.id = v.food_id order by v.food_id ASC`
    );

    return result;
  };

  uploadForm = async (reqObj: Request) => {
    const body = reqObj.body;

    const checkFoodNameResult = await this.knex(tables.FOOD).where("food_name", body.food_name);

    if (checkFoodNameResult.length == 0) {
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

      const nutritionValueArr = [];
      for (let i = 1; i <= nutritionMap.size; i++) {
        let value;
        if (body.per_unit == "per_package") {
          value = (body[`${nutritionMap.get(i)}`] / body["total_weight"]) * 100;
        } else if (body.per_unit == "per_serving") {
          value = (body[`${nutritionMap.get(i)}`] / body["serving_size"]) * 100;
        } else {
          value = body[`${nutritionMap.get(i)}`];
        }
        const nutritionValue = {
          nutrition_value: value,
          food_id: Number(foodID),
          nutrition_id: i,
        };
        nutritionValueArr.push(nutritionValue);
      }
      console.log(nutritionValueArr)
      await this.knex(tables.NUTRITION_VALUE).insert(nutritionValueArr);

      if (body.is_consumed == "YES") {
        const consumptions = {
          quantity: body["quantity"],
          user_id: reqObj.session["user"].id,
          food_id: Number(foodID),
        };
        await this.knex(tables.CONSUMPTION).insert(consumptions);
      }
    }

    return checkFoodNameResult;
  };

  convert = async (foodId: Number) => {
    const result = await this.knex(tables.NUTRITION_VALUE)
      .join(tables.NUTRITION, `${tables.NUTRITION}.id`, `${tables.NUTRITION_VALUE}.nutrition_id`)
      .select("*")
      .where(`${tables.NUTRITION_VALUE}.food_id`, foodId);

    return result;
  };
}
