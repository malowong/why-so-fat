import { FoodService } from "../services/FoodService";
import { Request, Response } from "express";

export class FoodController {
  constructor(private foodService: FoodService) {}

  foodListInfo = async (req: Request, res: Response) => {
    const foodList = await this.foodService.getFoodInfo();

    res.status(200).json(foodList).end();
  };

  upload = async (req: Request, res: Response) => {
    await this.foodService.upload(req);
    res.status(200).json({ message: "Successfully uploaded" });
  };
}
