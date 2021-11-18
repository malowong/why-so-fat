import Knex from "knex";
import { FoodService } from "../../services/FoodService";
const knexConfig = require("../../knexfile");
const knex = Knex(knexConfig["test"]);

describe("FoodService + DB", () => {
  let service: FoodService;

  beforeEach(async () => {
    service = new FoodService(knex);
    await knex("food").del();
    await knex.insert([
      {
        food_name: "可口可樂",
        food_photo: "1.jpg",
        energy: 500,
        protein: 20.8,
        total_fat: 10.5,
        saturated_fat: 5.6,
        trans_fat: 6.7,
        carbohydrates: 20.1,
        sodium: 300,
        user_id: 1,
      },
      {
        food_name: "百事可樂",
        food_photo: "2.jpg",
        energy: 600,
        protein: 10.8,
        total_fat: 7.5,
        saturated_fat: 4.6,
        trans_fat: 3.7,
        carbohydrates: 27.1,
        sodium: 400,
        user_id: 2,
      },
    ]);
  });

  it("test getFoodInfo - Food Found", async () => {
    const food = await service.getFoodInfo(1);
    expect(food).toBeDefined();
    expect(food[0].energy).toEqual(500);
    expect(food[1]).toBeUndefined();
  });

  it("test getFoodInfo - Food Not Found", async () => {
    const food = await service.getFoodInfo(5);
    expect(food).toBeUndefined();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
