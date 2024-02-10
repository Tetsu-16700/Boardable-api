import { NextFunction, Request, Response } from "express";
import { boardDTO } from "../models/dtos/board.dto";
import { http } from "../models/http/response.http";

class BoardMiddleware {
  async validateBoard(req: Request, res: Response, next: NextFunction) {
    try {
      boardDTO.parse(req.body);
      next();
    } catch (error) {
      const res_http = http.http500("Error in schema", error);
      res.status(res_http.code).json(res_http.response);
    }
  }
}

export const boardMiddleware = new BoardMiddleware();