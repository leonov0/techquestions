import { z } from "zod";

export const getQuestionSchema = z.object({
  technologyId: z.string().uuid().optional(),
  companyId: z.string().uuid().optional(),
  levelId: z.string().uuid().optional(),
  query: z.string().optional(),
  limit: z.coerce.number().min(1).optional(),
  page: z.coerce.number().min(1).optional(),
  orderBy: z.enum(["date", "rating", "title"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
