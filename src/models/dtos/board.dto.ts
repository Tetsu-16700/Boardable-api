import { z } from "zod";

export const boardDTO = z.object({
  title: z.string(),
  color: z.string().optional(),
});
