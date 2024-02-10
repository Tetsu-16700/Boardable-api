import { http } from "../models/http/response.http";
import { IAuth } from "../models/interfaces/auth.interface";
import { userQuery } from "../querys/user.query";

class UserService {
  async findUser(username: string) {
    try {
      const user = await userQuery.findUser(username);
      if (!user) return http.http400("User not found");
      return http.http200("User found", user);
    } catch (error) {
      return http.http500(undefined, error);
    }
  }
  async createUser(data: IAuth) {
    try {
      const res_created = await userQuery.createUser(data);
      return http.http201("User created", res_created);
    } catch (error) {
      return http.http500(undefined, error);
    }
  }
}

export const userService = new UserService();
