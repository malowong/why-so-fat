import { UserController } from "../../controllers/UserController";
import { UserService } from "../../services/UserService";
// import { checkPassword } from "../../utils/hash";
// import { logger } from "../../utils/logger";
import { Request, Response } from "express";

jest.mock("../../services/UserService");

describe("Testing UserController", () => {
  let controller: UserController;
  let service: UserService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new UserService({} as any);
    controller = new UserController(service);

    req = {
      params: {},
      query: {},
      body: {},
    } as Request;

    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as any as Response;
  });

  it("test login - invalid password", async () => {
    req.body.password = "987654321";

    await controller.login(req, res);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
  });
});
