"use cache";

import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getLevel(id: string) {
  cacheTag("levels");

  const rows = await database
    .select()
    .from(schema.levels)
    .where(eq(schema.levels.id, id))
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}
