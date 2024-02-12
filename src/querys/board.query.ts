import { query } from "../database/postgresql";

class BoardStatusQuery {
  async createStatusInitial(board_id: string) {
    const sql =
      "INSERT INTO board_status (board_id, description) VALUES ($1, 'To do'), ($1, 'Doing'), ($1, 'Done');";

    await query(sql, [board_id]);
  }

  async createNewStatus(board_id: string, description: string) {
    const sql =
      "INSERT INTO board_status (board_id, description) VALUES ($1, $2) returning*;";

    const response = await query(sql, [board_id, description]);
    return response.rows[0];
  }

  async deleteStatus(status_id: string) {
    const sql = "update  board_status set deleted=true where id =$1";
    await query(sql, [status_id]);
  }

  async findStatus(board_id: string) {
    const sql = "select*from board_status where board_id =$1 and deleted=false";
    const response = await query(sql, [board_id]);
    return response.rows;
  }
}

export const boardStatusQuery = new BoardStatusQuery();