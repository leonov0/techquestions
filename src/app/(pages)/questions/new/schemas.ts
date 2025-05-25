import { z } from "zod";

export const submitQuestionSchema = z.object({
  title: z.string().trim().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  body: z.string().trim().max(4096, "Details must be at most 4096 characters."),
  isAnonymous: z.boolean(),
  technologies: z.array(z.string().uuid()),
  companies: z.array(z.string().uuid()),
  seniorityLevels: z.array(z.string().uuid()),
});
