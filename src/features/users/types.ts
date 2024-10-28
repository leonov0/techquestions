import { z } from "zod";

import { updateUserSchema } from "./schemas";

export type UpdateUserPayload = z.infer<typeof updateUserSchema>;
