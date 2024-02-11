import { query } from "../database/postgresql";
import { IAuth } from "../models/interfaces/auth.interface";

class UserQuery {
  async findUser(username: string) {
    const sql = "select*from users where username=$1";
    const response = await query(sql, [username]);
    return response.rows[0];
  }

  async findUserById(id: string) {
    const sql = "select*from users where id=$1";
    const response = await query(sql, [id]);
    return response.rows[0];
  }

  async createUser(data: IAuth) {
    const sql =
      "insert into users(username, password) values($1, $2) returning*";
    const response = await query(sql, [data.username, data.password]);
    return response.rows[0];
  }
}

export const userQuery = new UserQuery();
