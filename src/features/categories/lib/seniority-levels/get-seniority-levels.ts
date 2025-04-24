"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getSeniorityLevels() {
  cacheTag("seniority-levels");

  return await database.select().from(schema.seniorityLevels);
}
