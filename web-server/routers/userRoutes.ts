import express from "express";
import { knex } from "../app";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { AsyncWrapper } from "../utils/asyncWrapper";
import { isLoggedInApi } from "../utils/guards";

const userService = new UserService(knex);
const userController = new UserController(userService);

export const userRoutes = express.Router();

userRoutes.post("/login", AsyncWrapper(userController.login));
userRoutes.get("/logout", isLoggedInApi, AsyncWrapper(userController.logout));
userRoutes.post("/signup", AsyncWrapper(userController.signup));
userRoutes.get("/profile", isLoggedInApi, AsyncWrapper(userController.getProfile));
userRoutes.put("/profile", isLoggedInApi, AsyncWrapper(userController.editProfile));
