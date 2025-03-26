import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { UpdateCategoryPayload } from "../types";

export async function updateTechnology(
  id: string,
  payload: UpdateCategoryPayload,
) {
  await database
    .update(schema.technologies)
    .set({
      ...payload,
      updatedAt: new Date(),
    })
    .where(eq(schema.technologies.id, id));

  revalidateTag("technologies");
}
