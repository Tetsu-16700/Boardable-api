import { http } from "../models/http/response.http";
import { IBoard } from "../models/interfaces/board.interface";
import { boardQuery } from "../querys/board.query";

class BoardService {
  async findBoards(user_id: string) {
    try {
      const boards = await boardQuery.findBoards(user_id);
      return http.http201("Boards", boards);
    } catch (error) {
      return http.http500("Error in find boards", error);
    }
  }
  async findBoardForId(id: string) {
    try {
      const board = await boardQuery.findBoardForId(id);
      if (!board) return http.http400("Board not found");
      return http.http200("Board", board);
    } catch (error) {
      return http.http500("Error in find board", error);
    }
  }

  async createBoard(user_id: string, data: IBoard) {
    try {
      const board = await boardQuery.findBoardForTitle(data.title);
      if (board) return http.http400("The board exist");
      const boards = await boardQuery.createBoard(user_id, data);
      return http.http201("Board created", boards);
    } catch (error) {
      return http.http500("Error in find boards", error);
    }
  }
}

export const boardService = new BoardService();
