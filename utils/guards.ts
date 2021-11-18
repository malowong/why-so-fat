import { Request, Response, NextFunction } from "express";

export function isLoggedIn(req: Request, res: Response, next: NextFunction) {
  // console.log(req.session["user"]);

  if (req.session?.["user"]) {
    next();
  } else {
    res.redirect("/login-page.html");
  }
}
