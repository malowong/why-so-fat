import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { checkPassword } from "../utils/hash";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "missing username or password" });
      return;
    }

    const user = await this.userService.getUserByUsername(username);
    console.log(user);
    if (!user || !(await checkPassword(password, user.password))) {
      res.status(401).json({ message: "invalid username or password" });
      return;
    }

    req.session["user"] = { id: user.id };
    res.status(200).json({ message: "success" });
  };

  signup = async (req: Request, res: Response) => {
    const { username, password, gender, height, weight } = req.body;
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
    console.log(isExist);
    if (isExist) {
      res.status(400).json({ message: "Username has been used" });
    } else {
      await this.userService.getUserByUsername(req.body);
      res.status(200).json({ message: "Successfully registered" });
    }
  };
}
