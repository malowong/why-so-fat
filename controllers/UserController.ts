import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { checkPassword } from "../utils/hash";
import { logger } from "../utils/logger";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ message: "missing username or password" });
        return;
      }

      const user = await this.userService.getUserByUsername(username);

      if (!user || !(await checkPassword(password, user.password))) {
        res.status(401).json({ message: "invalid username or password" });
        return;
      }

      req.session["user"] = { id: user.id, username: user.username };
      res.status(200).json({ message: "success" });
    } catch (err) {
      logger.error(err.message);
      res.status(500).json({ message: "internal server error" });
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
}
