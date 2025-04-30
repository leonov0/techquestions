import { z } from "zod";

import { updateQuestionSchema } from "./schemas";

export type UpdateQuestionPayload = z.infer<typeof updateQuestionSchema>;
