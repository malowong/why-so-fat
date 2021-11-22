import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/hash";
import { logger } from "../utils/logger";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await this.userService.getUserByUsername(username);
    console.log(user);
    if (!user || !(await checkPassword(password, user.password))) {
      res.status(400).json({ message: "Invalid username or password!!" });
      return;
    }

    req.session["user"] = { id: user.id, username: user.username };
    res.status(200).json({ message: "success" });
  };

  signup = async (req: Request, res: Response) => {
    console.log(req.body);
    const { username, password, gender, height, weight } = req.body;
    const resultObj = {
      username,
      password: await hashPassword(password),
      gender,
      height: Number(height),
      weight: Number(weight),
    };
    if (password.length < 6) {
      res.status(400).json({ message: "Password must contain at least 6 characters" });
      return;
    }
    if (gender != "M" && gender != "F") {
      res.status(400).json({ message: "Invalid gender" });
      return;
    }
    if (height < 140 || height > 210) {
      res.status(400).json({ message: "Height must be within 140cm - 210cm" });
      return;
    }
    if (weight < 40 || weight > 100) {
      res.status(400).json({ message: "Weight must be within 40kg - 100kg" });
      return;
    }
    const isExist = await this.userService.getUserByUsername(username);
    console.log("isExist" + isExist);
    if (isExist) {
      res.status(400).json({ message: "Username has been used" });
    } else {
      await this.userService.insertNewUser(resultObj);
      res.status(200).json({ message: "Successfully registered" });
    }
  };

  profile = async (req: Request, res: Response) => {
    try {
      const userID = req.session["user"].id;
      const user = await this.userService.getUserProfile(userID);

      res.status(200).json(user);
    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ message: "internal server error" });
    }
  };

  logout = async (req: Request, res: Response) => {
    try {
      if (req.session) {
        delete req.session["user"];
      }
      res.status(200).json({ message: "success" });
    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ message: "internal server error" });
    }
  };
}
