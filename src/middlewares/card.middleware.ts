import { NextFunction, Request, Response } from "express";
import { cardDTO } from "../models/dtos/card.dto";
import { http } from "../models/http/response.http";

class CardMiddleware {
  async validateCard(req: Request, res: Response, next: NextFunction) {
    try {
      cardDTO.parse(req.body);
      next();
    } catch (error) {
      const res_http = http.http500("Error in schema", error);
      res.status(res_http.code).json(res_http.response);
    }
  }
}

export const cardMiddleware = new CardMiddleware();