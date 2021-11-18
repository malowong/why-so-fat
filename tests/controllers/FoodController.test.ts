import { FoodController } from "../../controllers/FoodController";
import { FoodService } from "../../services/FoodService";
import { Request, Response } from "express";
import { logger } from "../../utils/logger";
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
    service.getFoodInfo = jest.fn((userID) =>
      Promise.resolve([
        {
          food_name: "魚仔餅",
          food_photo: "1.jpg",
          energy: 500,
          protein: 10.8,
          total_fat: 4.7,
          saturated_fat: 5,
          trans_fat: 5.5,
          carbohydrates: 52.3,
          sodium: 230,
          user_id: 1,
        },
      ])
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
    const userID = 1;
    req.session["user"].id = userID;

    await controller.info(req, res);
    expect(service.getFoodInfo).toBeCalledWith(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.end).toBeCalled();
  });

  it("test get food info fail - throw error", async () => {
    const errMessage = "jason is handsome";
    service.getFoodInfo = jest.fn(() => Promise.reject(new Error(errMessage)));

    await controller.info(req, res);
    expect(logger.error).toBeCalledWith(errMessage);
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ message: "internal server error" });
  });
});
