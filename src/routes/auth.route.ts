import express from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const authRouter = express.Router();

const prefix = "/auth";

authRouter.post(
  `${prefix}/login`,
  authMiddleware.validateSignup,
  authController.login
);
authRouter.post(
  `${prefix}/signup`,
  authMiddleware.validateSignup,
  authController.signup
);

authRouter.get(`${prefix}/validation`, authController.validation);

export default authRouter;
