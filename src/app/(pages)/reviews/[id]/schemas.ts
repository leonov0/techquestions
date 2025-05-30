import { z } from "zod";

export const updateQuestionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  body: z.string().trim().max(4096, "Details must be at most 4096 characters."),
  isAnonymous: z.boolean(),
  technologies: z.array(z.string().uuid()),
  companies: z.array(z.string().uuid()),
  seniorityLevels: z.array(z.string().uuid()),
  status: z.enum(["pending"]).optional(),
});
