import { z } from "zod";

import { updateRolesSchema } from "./schemas";

export type UpdateRolesPayload = z.infer<typeof updateRolesSchema>;
