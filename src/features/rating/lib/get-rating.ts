"use cache";

import { eq, sql, sum } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getRating(questionId: string) {
  cacheTag("rating");

  const [{ rating }] = await database
    .select({
      rating: sql<number>`COALESCE(${sum(schema.questionVotes.vote)}, 0)`,
    })
    .from(schema.questionVotes)
    .where(eq(schema.questionVotes.questionId, questionId));

  return rating;
}
