import { z } from "zod";

export const getQuestionSchema = z.object({
  technologyId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
});
