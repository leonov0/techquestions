import { z } from "zod";

export const commentSchema = z.object({
  questionId: z.string().uuid("Invalid question ID."),
  message: z
    .string()
    .trim()
    .nonempty("Message is required.")
    .max(512, "Message must be at most 512 characters long."),
});
