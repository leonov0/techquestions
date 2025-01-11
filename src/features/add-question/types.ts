import { z } from "zod";

import { submitQuestionSchema } from "./schemas";

export type SubmitQuestionPayload = z.infer<typeof submitQuestionSchema>;
