import { http } from "../models/http/response.http";
import { IAuth } from "../models/interfaces/auth.interface";
import bcrypt from "bcrypt";
import { userService } from "./user.service";
import jwt from "jsonwebtoken";
import { userQuery } from "../querys/user.query";

class AuthService {
  async signup(data: IAuth) {
    try {
      const res_user = await userService.findUser(data.username);
      if (res_user.response.ok)
        return http.http400("User exists, enter other username");
      const newPassword = await bcrypt.hash(data.password, 11);
      const res_created = await userService.createUser({
        username: data.username,
        password: newPassword,
      });
      return res_created;
    } catch (error) {
      return http.http500("Error in signup service", error);
    }
  }
  async login(data: IAuth) {
    try {
      const user = await userService.findUser(data.username);
      if (!user.response.ok) return http.http400("Error in login");
      const res_compare = await bcrypt.compare(
        data.password,
        user.response.data.password
      );
      if (!res_compare) return http.http400("Error in login");

      const format = {
        id: user.response.data.id,
      };
      const token = jwt.sign(format, "supersecret");

      return http.http200("login succesfully", { token });
    } catch (error) {
      return http.http500("Error in login service", error);
    }
  }
  async validation(token: string) {
    try {
      if (!token) return http.http401("Error authenticating 2");
      const decodeToken = jwt.verify(token, "supersecret") as any;

      if (decodeToken.id) {
        const res_user = await userService.findUserById(decodeToken.id);
        if (!res_user.response.ok) return http.http401("Error authenticating");
        return http.http200("Authentication success", {
          id: res_user.response.data.id,
        });
      }
      return http.http401("Error authenticating");
    } catch (error) {
      return http.http500("Error in login service", error);
    }
  }

  async me(token: string) {
    try {
      if (!token) return http.http401("Error authenticating ");
      const { id } = jwt.verify(token, "supersecret") as any;

      const res_user = await userService.findUserById(id);
      if (!res_user.response.ok) return res_user;
      return res_user;
    } catch (error) {
      return http.http500("Error in login service", error);
    }
  }
  async updateUser(token: string, data: any) {
    try {
      console.log(data);
      if (!token) return http.http401("Error authenticating");
      const { id } = jwt.verify(token, "supersecret") as any;

      if (data.passwords.length) {
        const newPassword = await bcrypt.hash(data.password, 11);

        const res_update = await userQuery.updateUserWithPassword(
          { ...data, password: newPassword },
          id
        );
        return http.http200("Update user", res_update);
      } else {
        const res_update = await userQuery.updateUserWithoutPassword(data, id);
        return http.http200("Update user", res_update);
      }
    } catch (error) {
      console.log(error);
      return http.http500("Error in login service", error);
    }
  }
}
export const authService = new AuthService();
