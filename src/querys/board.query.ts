import { query } from "../database/postgresql";
import { IBoard } from "../models/interfaces/board.interface";

class BoardQuery {
  async findBoardForUser(id: string, user_id: string) {
    const sql = " select*from boards where id=$1 and user_id=$2";
    const response = await query(sql, [id, user_id]);
    return response.rows[0];
  }

  async findBoards(user_id: string) {
    const sql = "select*from boards where user_id = $1 and deleted=false";
    const response = await query(sql, [user_id]);
    return response.rows;
  }

  // Este deberia crear los status pára el board
  async createBoard(user_id: string, data: IBoard) {
    const sql =
      "insert into boards(user_id,title,color) values($1,$2,$3) returning*";
    const response = await query(sql, [user_id, data.title, data.color]);
    return response.rows[0];
  }

  async findBoardForTitle(title: string) {
    const sql = "select*from boards where title = $1";
    const response = await query(sql, [title]);
    return response.rows[0];
  }

  async findBoardForId(id: string) {
    const sql = "select*from boards where id = $1 and deleted=false";
    const response = await query(sql, [id]);
    return response.rows[0];
  }

  async updateBoard(board_id: string, title: string) {
    const sql = "update boards set title=$1 where id = $2 returning*";
    const response = await query(sql, [title, board_id]);
    return response.rows[0];
  }
}

export const boardQuery = new BoardQuery();
