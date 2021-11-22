import express from "express";
import { consumptionRoutes } from "./routers/ConsumptionRoutes";
import { foodRoutes } from "./routers/FoodRoutes";
import { userRoutes } from "./routers/UserRoutes";

export const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/food", foodRoutes);
routes.use("/consumption", consumptionRoutes);
