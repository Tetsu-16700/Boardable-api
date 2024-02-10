import { query } from "../database/postgresql";
import { ICard } from "../models/interfaces/card.interface";

class CardQuery {
  async findCardsForStatusAndBoard(board_id: string, status_id: string) {
    const sql =
      "select* from cards where board_id =$1 and board_status_id =$2 ";
    const response = await query(sql, [board_id, status_id]);
    return response.rows;
  }

  async findCards(board_id: string) {
    const sql = "select* from cards where board_id =$1";
    const response = await query(sql, [board_id]);
    return response.rows;
  }

  async createCard(data: ICard) {
    const sql =
      "insert into cards (board_id,title,board_status_id) values ($1,$2,$3) returning*";
    const response = await query(sql, [
      data.board_id,
      data.title,
      data.board_status_id,
    ]);
    return response.rows[0];
  }

  async findCardForTitle(title: string) {
    const sql = "select* from cards where title =$1";
    const response = await query(sql, [title]);
    return response.rows[0];
  }

  async changeStatus(board_id: string, status: string) {
    const sql = "update cards set status = '$1' where board_id=$2 returning*";
    const response = await query(sql, [status, board_id]);
    return response.rows[0];
  }

  async changeTitle(board_id: string, title: string) {
    const sql = "update cards set title = '$1' where board_id=$2 returning*";
    const response = await query(sql, [title, board_id]);
    return response.rows[0];
  }
}

export const cardQuery = new CardQuery();
