import express from "express";
import { consumptionRoutes } from "./routers/consumptionRoutes";
import { foodRoutes } from "./routers/foodRoutes";
import { userRoutes } from "./routers/userRoutes";
import { isLoggedInApi } from "./utils/guards";

export const routes = express.Router();

routes.use("/user", userRoutes);
routes.use("/food", isLoggedInApi, foodRoutes);
routes.use("/consumption", isLoggedInApi, consumptionRoutes);
