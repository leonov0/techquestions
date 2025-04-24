import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { UpdateCategoryPayload } from "../../types";

export async function updateSeniorityLevel(
  id: string,
  payload: UpdateCategoryPayload,
) {
  await database
    .update(schema.seniorityLevels)
    .set({
      ...payload,
      updatedAt: new Date(),
    })
    .where(eq(schema.seniorityLevels.id, id));

  revalidateTag("seniority-levels");
}
