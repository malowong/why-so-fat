import { ConsumptionService } from "../services/ConsumptionService";
import { Request, Response } from "express";

export class ConsumptionController {
  constructor(private consumptionService: ConsumptionService) {}

  consumptionHistory = async (req: Request, res: Response) => {
    const userID = req.session["user"].id;
    const consumptionHistory = await this.consumptionService.getConsumptionHistory(userID);

    res.status(200).json(consumptionHistory)
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
    res.status(200).json(data);
  };

  quota = async (req: Request, res: Response) => {
    const userID = req.session["user"].id;
    const quotaData = await this.consumptionService.getQuotaData(userID);
    res.status(200).json(quotaData);
  };

  setStandard = async (req: Request, res: Response) => {
    const userID = req.session["user"].id;
    const bodyWeightData = await this.consumptionService.getStandardInfo(userID);
    res.status(200).json(bodyWeightData);
  };

  add = async (req: Request, res: Response) => {
    const foodInfo = req.body;
    const userID = req.session["user"].id;

    await this.consumptionService.addConsumption(foodInfo, userID);

    res.status(200).json({ message: "success add" })
  };

  deleteRecord = async (req: Request, res: Response) => {
    const userID = req.session["user"].id;
    const foodID = Number(req.params.foodID);
    await this.consumptionService.deleteRecord(foodID, userID);
    res.status(200).json({ message: "successfully deleted" });
  };
}
