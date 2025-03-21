import { z } from "zod";

export const getQuestionsSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});

export const reviewQuestionSchema = z.object({
  status: z.enum(["approved", "rejected"]),
  message: z.string().optional(),
});
