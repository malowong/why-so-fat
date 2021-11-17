import { Request, Response, NextFunction } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  if (req.session?.["user"]) {
    next();
  } else {
    res.redirect("/login.html");
  }
}
