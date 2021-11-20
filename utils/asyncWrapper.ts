import { Request, Response } from "express";
import { logger } from "../utils/logger";

export const AsyncWrapper = (fn: (req: Request, res: Response) => void) => async (req: Request, res: Response) => {
  try {
    fn(req, res);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: "internal server error" });
  }
};
