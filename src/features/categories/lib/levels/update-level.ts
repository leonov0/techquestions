import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { UpdateCategoryPayload } from "../../types";

export async function updateLevel(id: string, payload: UpdateCategoryPayload) {
  await database
    .update(schema.levels)
    .set({
      ...payload,
      updatedAt: new Date(),
    })
    .where(eq(schema.levels.id, id));

  revalidateTag("levels");
}
