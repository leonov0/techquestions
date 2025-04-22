import { and, eq } from "drizzle-orm";

import { database, schema } from "@/database";

export async function getCurrentVote(questionId: string, userId: string) {
  const rows = await database
    .select({
      vote: schema.questionVotes.vote,
    })
    .from(schema.questionVotes)
    .where(
      and(
        eq(schema.questionVotes.questionId, questionId),
        eq(schema.questionVotes.userId, userId),
      ),
    )
    .limit(1);

  return rows.length > 0 ? rows[0].vote : 0;
}
