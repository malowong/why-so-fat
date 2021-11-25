import { Request, Response, NextFunction } from "express";

export function isLoggedInStatic(req: Request, res: Response, next: NextFunction) {
  // console.log(req.session["user"]);

  if (req.session?.["user"]) {
    next();
  } else {
    res.redirect("/login-page.html");
  }
}

export function isLoggedInApi(req: Request, res: Response, next: NextFunction) {
  if (req.session?.['user']) {
      next();
  } else {
      res.status(400).json({ message: "you haven't logged in yet" })
  }
}

