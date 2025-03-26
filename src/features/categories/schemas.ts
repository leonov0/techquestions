import { z } from "zod";

export const updateCategorySchema = z.object({
  name: z.string().trim().max(255).nonempty(),
});
