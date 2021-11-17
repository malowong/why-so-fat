import express from "express";
import { knex } from "../app";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";

const userService = new UserService(knex);
const userController = new UserController(userService);

export const userRoutes = express.Router();

userRoutes.post("/login", userController.login);
