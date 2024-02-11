import { http } from "../models/http/response.http";
import { IBoard } from "../models/interfaces/board.interface";
import { boardQuery } from "../querys/board.query";
import { boardStatusQuery } from "../querys/board_status";
import { cardQuery } from "../querys/card.query";
import { authService } from "./auth.service";

class BoardService {
  async findBoards(token: string) {
    try {
      const res_validate = await authService.validation(token);
      if (!res_validate.response.ok) return res_validate;
      const boards = await boardQuery.findBoards(res_validate.response.data.id);
      return http.http200("Boards", boards);
    } catch (error) {
      return http.http500("Error in find boards", error);
    }
  }

  async findBoardForId(id: string) {
    try {
      const board = await boardQuery.findBoardForId(id);

      if (!board) return http.http400("Board not found");
      return http.http200("Board found", board);
    } catch (error) {
      return http.http500("Error in find boards", error);
    }
  }

  async findCards(board_id: string, status_id: string) {
    try {
      const board = await boardQuery.findBoardForId(board_id);
      if (!board) return http.http400("Board not found");
      await cardQuery.findCardsForStatusAndBoard(board_id, status_id);
      return http.http201("Board created");
    } catch (error) {
      return http.http500("Error in find boards", error);
    }
  }

  async createBoard(token: string, data: IBoard) {
    try {
      const res_validate = await authService.validation(token);
      if (!res_validate.response.ok) return res_validate;

      const board = await boardQuery.findBoardForTitle(data.title);

      if (board) return http.http400("The board exist");
      const newBoard = await boardQuery.createBoard(
        res_validate.response.data.id,
        data
      );

      await boardStatusQuery.createStatusInitial(newBoard.id);

      return http.http201("Board created", newBoard);
    } catch (error) {
      return http.http500("Error in find boards", error);
    }
  }

  // Status----------------

  async findStatus(board_id: string) {
    try {
      const res_board = await boardQuery.findBoardForId(board_id);
      if (!res_board) return http.http400("The board does not exist");
      const res_status = await boardStatusQuery.findStatus(board_id);
      return http.http200("Board status", res_status);
    } catch (error) {
      return http.http500("Error in find boards", error);
    }
  }

  async updateBoard(board_id: string, title: string) {
    try {
      const res_board = await boardQuery.findBoardForId(board_id);
      if (!res_board) return http.http400("The board does not exist");
      const res_update = await boardQuery.updateBoard(board_id, title);
      return http.http200("Board updated", res_update);
    } catch (error) {
      console.log(error);
      return http.http500("Error in update boards", error);
    }
  }
}

export const boardService = new BoardService();
