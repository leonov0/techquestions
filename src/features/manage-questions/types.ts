import { z } from "zod";

import { reviewQuestionSchema } from "./schemas";

export type ReviewQuestionPayload = z.infer<typeof reviewQuestionSchema>;
