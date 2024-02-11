import { http } from "../models/http/response.http";
import { ICard } from "../models/interfaces/card.interface";
import { cardQuery } from "../querys/card.query";
import { boardService } from "./board.service";

class CardService {
  async findCards(boardId: string) {
    try {
      const res_board = await boardService.findBoardForId(boardId);
      if (!res_board.response.ok) return res_board;
      const cards = await cardQuery.findCards(boardId);
      return http.http200("All cards", cards);
    } catch (error) {
      return http.http500("Error in find cards", error);
    }
  }

  async findCardsReplace(boardId: string, status_id: string) {
    try {
      const res_board = await boardService.findBoardForId(boardId);
      if (!res_board.response.ok) return res_board;
      const cards = await cardQuery.findCardsForStatusAndBoard(
        boardId,
        status_id
      );
      return http.http200("All cards", cards);
    } catch (error) {
      return http.http500("Error in find cards", error);
    }
  }

  async createCard(data: ICard) {
    try {
      // pending validation repeat card title
      const res_board = await boardService.findBoardForId(data.board_id);
      if (!res_board.response.ok) return res_board;
      const response = await cardQuery.createCard(data);
      return http.http200("Card created", response);
    } catch (error) {
      return http.http500("Error in find cards", error);
    }
  }
}

export const cardService = new CardService();