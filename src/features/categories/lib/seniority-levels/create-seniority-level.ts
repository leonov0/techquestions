import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { CreateCategoryPayload } from "../../types";

export async function createSeniorityLevel(payload: CreateCategoryPayload) {
  await database.insert(schema.seniorityLevels).values(payload);

  revalidateTag("seniority-levels");
}
