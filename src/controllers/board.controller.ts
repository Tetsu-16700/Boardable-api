import { Request, Response } from "express";
import { boardService } from "../services/board.service";
import { IBoard } from "../models/interfaces/board.interface";

// authorization pending
class BoardController {
  async findBoards(req: Request, res: Response) {
    const token = req.get("Authorization") as any;
    const response = await boardService.findBoards(token);
    res.status(response.code).json(response.response);
  }

  async createBoard(req: Request, res: Response) {
    const token = req.get("Authorization") as any;
    const data: IBoard = req.body;
    const response = await boardService.createBoard(token, data);
    res.status(response.code).json(response.response);
  }

  async findStatus(req: Request, res: Response) {
    const id = req.params.id;
    const response = await boardService.findStatus(id);
    res.status(response.code).json(response.response);
  }

  async findBoard(req: Request, res: Response) {
    const board_id = req.params.id;
    const response = await boardService.findBoardForId(board_id);
    res.status(response.code).json(response.response);
  }

  async updateBoard(req: Request, res: Response) {
    const board_id = req.params.id;
    const { title } = req.body;
    const response = await boardService.updateBoard(board_id, title);
    res.status(response.code).json(response.response);
  }

  async deleteBoard(req: Request, res: Response) {
    const board_id = req.params.id;
    const token = req.get("Authorization") as any;
    const response = await boardService.deleteBoard(board_id, token);
    res.status(response.code).json(response.response);
  }

  async deleteStatus(req: Request, res: Response) {
    const board_id = req.params.id;
    const status_id = req.params.status_id;
    const token = req.get("Authorization") as any;
    const response = await boardService.deleteBoardStatus(
      status_id,
      board_id,
      token
    );
    res.status(response.code).json(response.response);
  }

  async createBoardStatus(req: Request, res: Response) {
    const board_id = req.params.id;
    const token = req.get("Authorization") as any;
    const { description } = req.body;
    // pending validation description zod
    const response = await boardService.createBoardStatus(
      board_id,
      description,
      token
    );
    res.status(response.code).json(response.response);
  }
}

export const boardController = new BoardController();