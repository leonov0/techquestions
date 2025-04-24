import { z } from "zod";

export const updateRolesSchema = z.object({
  roles: z.array(z.enum(["admin", "user"])),
});
