"use cache";

import { eq } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getTechnology(id: string) {
  cacheTag("technologies");

  const rows = await database
    .select()
    .from(schema.technologies)
    .where(eq(schema.technologies.id, id))
    .limit(1);

  if (rows.length === 0) {
    return null;
  }

  return rows[0];
}
