import { FoodController } from "../../controllers/FoodController";
import { FoodService } from "../../services/FoodService";
import { Request, Response } from "express";
import { Knex } from "knex";

jest.mock("../../services/FoodService.ts");
jest.mock("../../utils/logger.ts");

describe("FoodController", () => {
  let controller: FoodController;
  let service: FoodService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new FoodService({} as Knex);
    service.getFoodInfo = jest.fn(
      () =>
        Promise.resolve({
          // {
          //   food_id: 3,
          //   food_name: "chips",
          //   food_photo: "1.jpg",
          //   total_weight: 10.8,
          //   id: 4,
          //   nutrition_name: "sugar",
          //   nutrition_value: 52.3,
          //   per_unit: 230,
          // },
        } as any) //
    );

    req = {
      session: {
        user: {} as any,
      } as any,
    } as Request;
    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      end: jest.fn(),
    } as any as Response;

    controller = new FoodController(service);
  });

  it("test get food info success", async () => {
    await controller.foodListInfo(req, res);
    expect(service.getFoodInfo).toBeCalledWith();
    expect(res.status).toBeCalledWith(200);
    expect(res.end).toBeCalled();
  });
});
