"use cache";

import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getTechnologies() {
  cacheTag("technologies");

  return await database.select().from(schema.technologies);
}
