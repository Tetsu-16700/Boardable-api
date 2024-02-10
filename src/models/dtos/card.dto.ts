import { z } from "zod";

export const cardDTO = z.object({
  title: z.string(),
  status: z.string(),
});
