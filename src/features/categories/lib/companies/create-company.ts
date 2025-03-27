import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import type { CreateCategoryPayload } from "../../types";

export async function createCompany(payload: CreateCategoryPayload) {
  await database.insert(schema.companies).values(payload);

  revalidateTag("companies");
}
