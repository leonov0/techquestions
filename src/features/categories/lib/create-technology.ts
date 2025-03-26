import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { CreateCategoryPayload } from "../types";

export async function createTechnology(payload: CreateCategoryPayload) {
  await database.insert(schema.technologies).values(payload);

  revalidateTag("technologies");
}
