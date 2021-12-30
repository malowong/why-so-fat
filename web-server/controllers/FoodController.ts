import { FoodService } from "../services/FoodService";
import { Request, Response } from "express";
import fetch from "node-fetch";
export class FoodController {
  constructor(private foodService: FoodService) {}

  foodNameListInfo = async (req: Request, res: Response) => {
    const foodList = await this.foodService.getFoodNameList();

    res.status(200).json(foodList)
  };

  foodListInfoWithNutrition = async (req: Request, res: Response) => {
    const foodList = await this.foodService.getFoodAndNutritionInfo();

    res.status(200).json(foodList)
  };

  upload = async (req: Request, res: Response) => {
    const checkFoodNameResult = await this.foodService.uploadForm(req);
    checkFoodNameResult.length > 0
      ? res.status(409).json({ message: "Existing Food Product!" })
      : res.status(200).json({ message: "Successfully uploaded" });
  };

  ocr = async (req: Request, res: Response) => {
    const body = req.file?.buffer.toString("base64");

    const resp = await fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: body }),
    });

    if (resp.status !== 200) {
      res.status(resp.status).json({ message: "error" });
      return;
    }

    const data = await resp.json();
    res.status(200).json(data);
  };

  convert = async (req: Request, res: Response) => {
    const foodId = Number(req.params.foodId);
    const data = await this.foodService.convert(foodId);
    res.status(200).json(data);
  };
}
