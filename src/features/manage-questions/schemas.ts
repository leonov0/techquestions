import { z } from "zod";

export const getQuestionSchema = z.object({
  status: z.array(z.enum(["pending", "approved", "rejected"])).optional(),
});
