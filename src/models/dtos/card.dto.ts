import { z } from "zod";

export const cardDTO = z.object({
  title: z.string(),
  board_status_id: z.number(),
});
