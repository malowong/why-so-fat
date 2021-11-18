import express from "express";
import { knex } from "../app";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { Request, Response } from "express";
import { logger } from "../utils/logger";

const userService = new UserService(knex);
const userController = new UserController(userService);

export const userRoutes = express.Router();

const AsyncWrapper = (fn: (req: Request, res: Response) => void) => async (req: Request, res: Response) => {
  try {
    fn(req, res);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "internal server error" });
  }
};

userRoutes.post("/login", AsyncWrapper(userController.login));
userRoutes.get("/logout", AsyncWrapper(userController.logout));
userRoutes.post("/signup", AsyncWrapper(userController.signup));
userRoutes.get("/profile", AsyncWrapper(userController.profile));
