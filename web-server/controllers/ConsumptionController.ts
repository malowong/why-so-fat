import { ConsumptionService } from "../services/ConsumptionService";
import { Request, Response } from "express";

export class ConsumptionController {
  constructor(private consumptionService: ConsumptionService) {}

  consumptionHistory = async (req: Request, res: Response) => {
    const userID = req.session["user"].id;
    const consumptionHistory = await this.consumptionService.getConsumptionHistory(userID);

    res.status(200).json(consumptionHistory).end();
  };

  homePageRecord = async (req: Request, res: Response) => {
    const userID = req.session["user"].id;
    const result = await this.consumptionService.getHomePageRecord(userID);

    res.status(200).json(result);
  };

  consumptionDetails = async (req: Request, res: Response) => {
    const foodID = Number(req.params.foodID);
    const userID = Number(req.params.userID);
    const data = await this.consumptionService.getConsumptionDetails(foodID, userID);
    res.json(data);
  };

  quota = async (req: Request, res: Response) => {
    // const userID = req.session["user"].id;
    const quotaData = await this.consumptionService.getQuotaData();
    res.json(quotaData);
  };
}
