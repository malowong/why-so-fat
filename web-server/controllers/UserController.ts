import { UserService } from "../services/UserService";
import { Request, Response } from "express";
import { checkPassword, hashPassword } from "../utils/hash";

export class UserController {
  constructor(private userService: UserService) {}

  login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const user = await this.userService.getUserByUsername(username);

    if (!user || !(await checkPassword(password, user.password))) {
      res.status(400).json({ message: "Invalid username or password!!" });
      return;
    }

    req.session["user"] = { id: user.id, username: user.username };
    res.status(200).json({ message: "success" });
  };

  signup = async (req: Request, res: Response) => {
    console.log(req.body);
    const { username, password, gender, height, weight, energy_intake } = req.body;
    const resultObj = {
      username,
      password: await hashPassword(password),
      gender,
      height: Number(height),
      weight: Number(weight),
      energy_intake: Number(energy_intake),
    };
    if (password.length < 6 || undefined) {
      res.status(400).json({ message: "Password must contain at least 6 characters" });
      return;
    }
    if (gender != "male" && gender != "female") {
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
    if (energy_intake <= 1000) {
      res.status(400).json({ message: "Energy intake must be larger than 1000 kcal" });
    }
    const isExist = await this.userService.getUserByUsername(username);
    if (isExist) {
      res.status(400).json({ message: "Username has been used" });
    } else {
      const newUserID = await this.userService.insertNewUser(resultObj);
      req.session["user"] = { id: newUserID[0], username };
      res.status(200).json({ message: "Successfully registered" });
    }
  };

  getProfile = async (req: Request, res: Response) => {
    const userID = req.session["user"].id;
    const user = await this.userService.getUserProfile(userID);

    res.status(200).json(user);
  };

  editProfile = async (req: Request, res: Response) => {
    const userID = req.session["user"].id;
    const { height, weight, energyIntake } = req.body;
    await this.userService.editUserProfile(userID, height, weight, energyIntake);

    res.status(200).json({ message: "success edit" });
  };

  logout = async (req: Request, res: Response) => {
    if (req.session) {
      delete req.session["user"];
    }
    res.status(200).json({ message: "success" });
  };
}
