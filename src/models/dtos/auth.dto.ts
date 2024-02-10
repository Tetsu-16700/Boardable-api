import { z } from "zod";

export const authDTO = z.object({
  username: z.string(),
  password: z.string(),
});
