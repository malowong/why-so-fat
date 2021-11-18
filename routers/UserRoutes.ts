import express from "express";
import { Request, Response } from "express";
import { knex } from "../app";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { logger } from "../utils/logger";

const userService = new UserService(knex);
const userController = new UserController(userService);

export const userRoutes = express.Router();

const AsyncWrapper = (fn: any) => async (req: Request, res: Response) => {
  try {
    // console.log("req body", req.body);
    await fn();
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

// userRoutes.post("/login", AsyncWrapper(userController.login));
userRoutes.post("/signup", AsyncWrapper(userController.signup));
userRoutes.get("/profile", userController.profile);
// userRoutes.post("/signup", userController.signup);
