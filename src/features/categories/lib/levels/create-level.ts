import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { CreateCategoryPayload } from "../../types";

export async function createLevel(payload: CreateCategoryPayload) {
  await database.insert(schema.levels).values(payload);

  revalidateTag("levels");
}
