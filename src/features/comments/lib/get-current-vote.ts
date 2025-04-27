import { and, eq } from "drizzle-orm";

import { database, schema } from "@/database";

export async function getCurrentVote(commentId: string, userId: string) {
  const rows = await database
    .select({
      vote: schema.commentVotes.vote,
    })
    .from(schema.commentVotes)
    .where(
      and(
        eq(schema.commentVotes.commentId, commentId),
        eq(schema.commentVotes.userId, userId),
      ),
    )
    .limit(1);

  return rows.length > 0 ? rows[0].vote : 0;
}
