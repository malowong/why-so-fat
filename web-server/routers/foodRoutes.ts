import express from "express";
import { knex } from "../app";
import { FoodController } from "../controllers/FoodController";
import { FoodService } from "../services/FoodService";
import { AsyncWrapper } from "../utils/asyncWrapper";
import multer from "multer";
import path from "path";

const foodService = new FoodService(knex);
const foodController = new FoodController(foodService);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split("/")[1]}`);
  },
});
const upload = multer({ storage });

export const foodRoutes = express.Router();

foodRoutes.get("/info", AsyncWrapper(foodController.foodListInfo));
foodRoutes.post("/upload", upload.single("image"), AsyncWrapper(foodController.upload));