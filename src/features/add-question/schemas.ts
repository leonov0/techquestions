import { z } from "zod";

export const submitQuestionSchema = z.object({
  title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  body: z.string().max(1024, "Details must be at most 1024 characters."),
  isAnonymous: z.boolean(),
  technologies: z.array(z.string().uuid()),
  companies: z.array(z.string().uuid()),
  levels: z.array(z.string().uuid()),
});
