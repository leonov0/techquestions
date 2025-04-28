import { z } from "zod";

export const commentSchema = z.object({
  questionId: z.string().uuid("Invalid question ID."),
  message: z
    .string()
    .trim()
    .nonempty("Message is required.")
    .max(1024, "Message must be at most 1024 characters long."),
});
