import { Request, Response } from "express";
import { logger } from "../utils/logger";

export const AsyncWrapper = (fn: any) => async (req: Request, res: Response) => {
  try {
    await fn(req, res);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
