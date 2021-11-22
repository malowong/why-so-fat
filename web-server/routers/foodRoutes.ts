import express from "express";
import { knex } from "../app";
import { FoodController } from "../controllers/FoodController";
import { FoodService } from "../services/FoodService";
import { AsyncWrapper } from "../utils/asyncWrapper";

const foodService = new FoodService(knex);
const foodController = new FoodController(foodService);

export const foodRoutes = express.Router();

foodRoutes.get("/info", AsyncWrapper(foodController.foodListInfo));