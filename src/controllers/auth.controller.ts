import { Request, Response } from "express";
import { IAuth } from "../models/interfaces/auth.interface";
import { authService } from "../services/auth.service";

class AuthController {
  async signup(req: Request, res: Response) {
    const data: IAuth = req.body;
    const res_created = await authService.signup(data);
    return res.status(res_created.code).json(res_created.response);
  }

  async login(req: Request, res: Response) {
    const data: IAuth = req.body;
    const res_created = await authService.login(data);
    return res.status(res_created.code).json(res_created.response);
  }
}

export const authController = new AuthController();
