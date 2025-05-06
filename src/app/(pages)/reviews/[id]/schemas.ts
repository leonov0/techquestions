import { z } from "zod";

export const updateQuestionSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  body: z.string().max(1024, "Details must be at most 1024 characters."),
  isAnonymous: z.boolean(),
  technologies: z.array(z.string().uuid()),
  companies: z.array(z.string().uuid()),
  seniorityLevels: z.array(z.string().uuid()),
  status: z.enum(["pending"]).optional(),
});
