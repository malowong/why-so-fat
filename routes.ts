import express from "express";
import { consumptionRoutes } from "./routers/consumptionRoutes";
import { foodRoutes } from "./routers/foodRoutes";
import { userRoutes } from "./routers/userRoutes";

export const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/food", foodRoutes);
routes.use("/consumption", consumptionRoutes);
