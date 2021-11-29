import Knex from "knex";
import { ConsumptionService } from "../../services/ConsumptionService";
import { tables } from "../../utils/freezedObj";
import { truncateTable } from "../../utils/truncateTable";
const knexConfig = require("../../knexfile");
const knex = Knex(knexConfig["test"]);

describe("ConsumptionService", () => {
  let service: ConsumptionService;

  beforeEach(async () => {
    service = new ConsumptionService(knex);
    await truncateTable(tables);

    await knex(tables.USER).insert({
      username: "matt",
      password: "159753",
      gender: "male",
      height: 153,
      weight: 80.6,
    });

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
        { food_name: "熱浪薯片", food_photo: "1.jpg", total_weight: 33 },
        { food_name: "百事可樂", food_photo: "2.jpg", total_weight: 250 },
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

    await knex
      .insert([
        {
          quantity: 1,
          user_id: 1,
          food_id: 1,
        },
        {
          quantity: 2,
          user_id: 1,
          food_id: 2,
        },
      ])
      .into(tables.CONSUMPTION);
  });

  it("test getConsumptionHistory - Consumptions Found", async () => {
    const consumptions = await service.getConsumptionHistory(1);

    expect(consumptions).toBeDefined();
    // expect(consumptions[0].food_name).toEqual("熱浪薯片");
    // expect(consumptions[0].nutrition_value).toBe(405);
    // expect(consumptions[1].nutrition_name).toEqual("Protein");
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
