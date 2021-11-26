import express from "express";
import { knex } from "../app";
import { ConsumptionController } from "../controllers/ConsumptionController";
import { ConsumptionService } from "../services/ConsumptionService";
import { AsyncWrapper } from "../utils/asyncWrapper";

const consumptionService = new ConsumptionService(knex);
const consumptionController = new ConsumptionController(consumptionService);

export const consumptionRoutes = express.Router();

consumptionRoutes.get("/history", AsyncWrapper(consumptionController.consumptionHistory));
consumptionRoutes.get("/homePageRecord", AsyncWrapper(consumptionController.homePageRecord));
consumptionRoutes.get("/consumptiondetails/:foodID/:userID", AsyncWrapper(consumptionController.consumptionDetails));
consumptionRoutes.get("/quota", AsyncWrapper(consumptionController.quota));
consumptionRoutes.get("/userbodyweight", AsyncWrapper(consumptionController.userBodyWeight));
