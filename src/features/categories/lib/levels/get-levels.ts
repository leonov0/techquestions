"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getLevels() {
  cacheTag("levels");

  return await database.select().from(schema.levels);
}
