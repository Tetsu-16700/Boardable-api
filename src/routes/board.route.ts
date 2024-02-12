import express from "express";
import { boardController } from "../controllers/board.controller";
import { boardMiddleware } from "../middlewares/board.middleware";
import { cardController } from "../controllers/card.controller";
import { cardMiddleware } from "../middlewares/card.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

const boardRouter = express.Router();

const prefix = "/boards";

boardRouter.get(
  `${prefix}`,
  authMiddleware.authorization,
  boardController.findBoards
);

boardRouter.get(
  `${prefix}/:id`,
  authMiddleware.authorization,
  boardController.findBoard
);

boardRouter.patch(
  `${prefix}/:id`,
  authMiddleware.authorization,
  boardMiddleware.validateBoard,
  boardController.updateBoard
);

boardRouter.post(
  `${prefix}`,
  authMiddleware.authorization,
  boardMiddleware.validateBoard,
  boardController.createBoard
);

boardRouter.delete(
  `${prefix}/:id`,
  authMiddleware.authorization,
  boardController.deleteBoard
);

// status --------------------------------------------------------------------------------

boardRouter.get(
  `${prefix}/:id/status`,
  authMiddleware.authorization,
  boardController.findStatus
);

boardRouter.post(
  `${prefix}/:id/status`,
  authMiddleware.authorization,
  boardController.createBoardStatus
);

boardRouter.delete(
  `${prefix}/:id/status/:status_id`,
  authMiddleware.authorization,
  boardController.deleteStatus
);

// board detail  ibamos a borrarlo ----------------------------------------------------------

// cards --------------------------------------------------------

boardRouter.get(
  `${prefix}/:id/status/:status_id`,
  authMiddleware.authorization,
  cardController.findCardsReplace
);

boardRouter.get(
  `${prefix}/:id/cards`,
  authMiddleware.authorization,
  cardController.findCards
);
boardRouter.post(
  `${prefix}/:id/cards`,
  cardMiddleware.validateCard,
  cardController.createCard
);

export default boardRouter;