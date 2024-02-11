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
    const res_login = await authService.login(data);

    // if (res_login.response.ok) {
    //   req.session.userId = res_login.response.data.id;
    // }

    return res.status(res_login.code).json(res_login.response);
  }

  async validation(req: Request, res: Response) {
    const token = req.get("Authorization") as any;
    const res_validation = await authService.validation(token);
    return res.status(res_validation.code).json(res_validation.response);
  }

  async me(req: Request, res: Response) {
    const token = req.get("Authorization") as any;
    const response = await authService.me(token);
    return res.status(response.code).json(response.response);
  }

  async updateUser(req: Request, res: Response) {
    const token = req.get("Authorization") as any;

    const data = req.body;
    const response = await authService.updateUser(token, data);
    return res.status(response.code).json(response.response);
  }

  async deleteUser(req: Request, res: Response) {}
}

export const authController = new AuthController();