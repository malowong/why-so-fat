import { FoodService } from "../services/FoodService";
import { Request, Response } from "express";
import { logger } from "../utils/logger";

export class FoodController {
  constructor(private foodService: FoodService) {}

  info = async (req: Request, res: Response) => {
    try {
      const userID = req.session["user"].id;
      const foodList = await this.foodService.getFoodInfo(userID);

      res.status(200).json(foodList);
    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
