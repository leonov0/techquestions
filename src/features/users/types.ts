import { z } from "zod";

import { getUserQuestionsSchema, updateUserSchema } from "./schemas";

export type UpdateUserPayload = z.infer<typeof updateUserSchema>;

export type GetUserQuestionsPayload = z.infer<typeof getUserQuestionsSchema>;

export type DeleteUserPayload = {
  username: string;
};
