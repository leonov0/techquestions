import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { UpdateCategoryPayload } from "../../types";

export async function updateCompany(
  id: string,
  payload: UpdateCategoryPayload,
) {
  await database
    .update(schema.companies)
    .set({
      ...payload,
      updatedAt: new Date(),
    })
    .where(eq(schema.companies.id, id));

  revalidateTag("companies");
}
