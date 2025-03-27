import { z } from "zod";

export const updateCategorySchema = z.object({
  name: z.string().trim().max(255).nonempty(),
});

export const createCategorySchema = z.object({
  name: z.string().trim().max(255).nonempty(),
});
