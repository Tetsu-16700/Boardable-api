import { NextFunction, Request, Response } from "express";
import { authDTO } from "../models/dtos/auth.dto";
import { http } from "../models/http/response.http";
import { authService } from "../services/auth.service";

class AuthMiddleware {
  async validateSignup(req: Request, res: Response, next: NextFunction) {
    try {
      authDTO.parse(req.body);
      next();
    } catch (error) {
      const res_http = http.http500("Error in schema", error);
      res.status(res_http.code).json(res_http.response);
    }
  }

  async authorization(req: Request, res: Response, next: NextFunction) {
    const token = req.get("Authorization") as any;
    const response = await authService.validation(token);
    if (response.response.ok) {
      next();
    } else {
      res.status(response.code).json(response.response);
    }
  }
}

export const authMiddleware = new AuthMiddleware();