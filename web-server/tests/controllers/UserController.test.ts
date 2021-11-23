import { UserController } from "../../controllers/UserController";
import { UserService } from "../../services/UserService";
import { Request, Response } from "express";
import { Knex } from "knex";

jest.mock("../../services/UserService");

describe("Testing UserController", () => {
  let controller: UserController;
  let service: UserService;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    service = new UserService({} as Knex);
    service.getUserByUsername = jest.fn(() =>
      Promise.resolve({
        username: "bill",
        password: "25245356345345",
      } as any)
    );

    req = {
      params: {},
      query: {},
      body: {},
    } as Request;

    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    } as any as Response;

    controller = new UserController(service);
  });

  it("test login - invalid password", async () => {
    req.body.password = "987654321";

    await controller.login(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: "Invalid username or password!!" });
  });

  it("test logout - success", async () => {
    await controller.logout(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({ message: "success" });
  });
});
