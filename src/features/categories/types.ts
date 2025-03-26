import { z } from "zod";

import { updateCategorySchema } from "./schemas";

export type UpdateCategoryPayload = z.infer<typeof updateCategorySchema>;

export type DeleteCategoryPayload = {
  name: string;
};
