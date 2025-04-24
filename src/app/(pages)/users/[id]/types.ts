import { z } from "zod";

import { getUserQuestionsSchema } from "./schemas";

export type GetUserQuestionsPayload = z.infer<typeof getUserQuestionsSchema>;
