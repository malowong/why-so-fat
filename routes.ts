import express from "express";
import { userRoutes } from "./routers/UserRoutes";

export const routes = express.Router();

routes.use("/user", userRoutes);
