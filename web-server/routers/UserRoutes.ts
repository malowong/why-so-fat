import express from "express";
import { knex } from "../app";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";
import { AsyncWrapper } from "../utils/asyncWrapper";

const userService = new UserService(knex);
const userController = new UserController(userService);

export const userRoutes = express.Router();

userRoutes.post("/login", AsyncWrapper(userController.login));
userRoutes.get("/logout", AsyncWrapper(userController.logout));
userRoutes.post("/signup", AsyncWrapper(userController.signup));
userRoutes.get("/profile", AsyncWrapper(userController.getProfile));
userRoutes.put("/profile", AsyncWrapper(userController.editProfile));
userRoutes.get("/homePageRecord", AsyncWrapper(userController.getHomePageRecord));
