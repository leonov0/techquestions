import { eq } from "drizzle-orm";

import { database, schema } from "@/database";

import { updateUserSchema } from "../schemas";
import type { UpdateUserPayload } from "../types";

export async function updateUser(userId: string, payload: UpdateUserPayload) {
  const parsedPayload = await updateUserSchema.parseAsync(payload);

  await database
    .update(schema.users)
    .set(parsedPayload)
    .where(eq(schema.users.id, userId));
}
