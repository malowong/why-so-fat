import { ConsumptionController } from "../../controllers/ConsumptionController";
import { ConsumptionService } from "../../services/ConsumptionService";
import { Request, Response } from "express";
import { Knex } from "knex";

jest.mock("../../services/ConsumptionService.ts");

describe("ConsumptionController", () => {
  let controller: ConsumptionController;
  let service: ConsumptionService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new ConsumptionService({} as Knex);
    service.getConsumptionHistory = jest.fn(() => Promise.resolve({} as any));

    req = {
      session: {
        user: {
          id: 5,
        } as any,
      } as any,
    } as Request;

    res = {
      status: jest.fn(() => res),
      json: jest.fn(() => res),
      end: jest.fn(),
    } as any as Response;

    controller = new ConsumptionController(service);
  });

  it("test get consumption history - success", async () => {
    await controller.consumptionHistory(req, res);

    expect(service.getConsumptionHistory).toBeCalledWith(5);
    expect(res.status).toBeCalledWith(200);
    expect(res.end).toBeCalled();
  });
});
