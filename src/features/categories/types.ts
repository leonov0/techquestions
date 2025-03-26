import { z } from "zod";

import { updateCategorySchema } from "./schemas";

export type CreateCategoryPayload = z.infer<typeof updateCategorySchema>;

export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>;

export type DeleteCategoryPayload = {
  name: string;
};
