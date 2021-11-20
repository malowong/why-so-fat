import { FoodService } from "../services/FoodService";
import { Request, Response } from "express";

export class FoodController {
  constructor(private foodService: FoodService) {}

  foodListInfo = async (req: Request, res: Response) => {
    const foodList = await this.foodService.getFoodInfo();

    res.status(200).json(foodList).end();
  };
}
