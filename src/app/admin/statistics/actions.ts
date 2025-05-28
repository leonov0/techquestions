"use cache";

import { count, eq, sql } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import { database, schema } from "@/database";

export async function getCreatedQuestionsCount() {
  cacheTag("questions");

  const rows = await database
    .select({
      date: sql<string>`TO_CHAR(DATE_TRUNC('day', ${schema.questions.createdAt}), 'YYYY-MM-DD')`.as(
        "date",
      ),
      count: count(),
    })
    .from(schema.questions)
    .where(eq(schema.questions.status, "approved"))
    .groupBy(sql`DATE_TRUNC('day', ${schema.questions.createdAt})`);

  return rows;
}
