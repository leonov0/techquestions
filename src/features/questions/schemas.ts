import { z } from "zod";

export const getQuestionSchema = z.object({
  technologies: z.array(z.string().uuid()).optional(),
  companies: z.array(z.string().uuid()).optional(),
  levels: z.array(z.string().uuid()).optional(),
  query: z.string().optional(),
  limit: z.coerce.number().min(1).optional(),
  page: z.coerce.number().min(1).optional(),
  orderBy: z.enum(["date", "rating", "title"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});
