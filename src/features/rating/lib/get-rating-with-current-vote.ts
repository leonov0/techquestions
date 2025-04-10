"use cache";

import { and, eq, sql, sum } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

export async function getRatingWithCurrentVote(
  questionId: string,
  userId: string,
) {
  cacheTag("rating");

  const getCurrentVoteQuery = database
    .select({
      currentVote: schema.questionVotes.vote,
    })
    .from(schema.questionVotes)
    .where(
      and(
        eq(schema.questionVotes.questionId, questionId),
        eq(schema.questionVotes.userId, userId),
      ),
    )
    .limit(1);

  const [data] = await database
    .select({
      rating: sql<number>`COALESCE(${sum(schema.questionVotes.vote)}, 0)`,
      currentVote: sql<number>`COALESCE(${getCurrentVoteQuery}, 0)`,
    })
    .from(schema.questionVotes)
    .where(eq(schema.questionVotes.questionId, questionId));

  return data;
}
