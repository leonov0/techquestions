"use cache";

import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getSeniorityLevel(id: string) {
  cacheTag("seniority-levels");

  const rows = await database
    .select()
    .from(schema.seniorityLevels)
    .where(eq(schema.seniorityLevels.id, id))
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}
