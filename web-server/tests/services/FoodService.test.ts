import Knex from "knex";
const knexConfig = require("../../knexfile");
const knex = Knex(knexConfig["test"]);
import { FoodService } from "../../services/FoodService";
import { tables } from "../../utils/freezedObj";
import { truncateTable } from "../../utils/truncateTable";

describe("FoodService + DB", () => {
  let service: FoodService;

  beforeEach(async () => {
    service = new FoodService(knex);
    await truncateTable(tables);

    await knex
      .insert([
        { nutrition_name: "Energy" },
        { nutrition_name: "Protein" },
        { nutrition_name: "Total fat" },
        { nutrition_name: "Saturated fat" },
        { nutrition_name: "Trans fat" },
        { nutrition_name: "Carbohydrates" },
        { nutrition_name: "Sugars" },
        { nutrition_name: "Sodium" },
      ])
      .into(tables.NUTRITION);

    await knex
      .insert([
        { food_name: "魚仔餅", food_photo: "1.jpg", total_weight: 33 },
        { food_name: "可口可樂", food_photo: "2.jpg", total_weight: 250 },
        { food_name: "金莎朱古力", food_photo: "3.jpg", total_weight: 17 },
        { food_name: "卡樂B薯條", food_photo: "4.jpg", total_weight: 43 },
      ])
      .into(tables.FOOD);

    await knex
      .insert([
        { nutrition_value: 405, food_id: 1, nutrition_id: 1 },
        { nutrition_value: 5.3, food_id: 1, nutrition_id: 2 },
        { nutrition_value: 11.8, food_id: 1, nutrition_id: 3 },
        { nutrition_value: 5.5, food_id: 1, nutrition_id: 4 },
        { nutrition_value: 69, food_id: 1, nutrition_id: 6 },
        { nutrition_value: 10.8, food_id: 1, nutrition_id: 7 },
        { nutrition_value: 748, food_id: 1, nutrition_id: 8 },
        { nutrition_value: 42, food_id: 2, nutrition_id: 1 },
        { nutrition_value: 10.6, food_id: 2, nutrition_id: 6 },
        { nutrition_value: 10.6, food_id: 2, nutrition_id: 7 },
        { nutrition_value: 4, food_id: 2, nutrition_id: 8 },
      ])
      .into(tables.NUTRITION_VALUE);
  });

  it("test getFoodAndNutritionInfo - Food Found", async () => {
    const food = (await service.getFoodAndNutritionInfo()).rows;

    expect(food).toBeDefined();
    expect(food[0].nutrition_name).toBe("Energy");
    expect(food[1].nutrition_value).toBe(5.3);
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
