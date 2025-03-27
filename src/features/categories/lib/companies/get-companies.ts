"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getCompanies() {
  cacheTag("companies");

  return await database.select().from(schema.companies);
}
