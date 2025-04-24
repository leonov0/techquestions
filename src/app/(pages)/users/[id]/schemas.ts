import { z } from "zod";

export const getUserQuestionsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  order: z.enum(["new", "top", "relevance"]).default("new"),
});
