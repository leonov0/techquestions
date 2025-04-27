import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

export async function vote(commentId: string, userId: string, vote: number) {
  revalidateTag("comments");

  await database
    .insert(schema.commentVotes)
    .values({
      commentId,
      userId,
      vote,
    })
    .onConflictDoUpdate({
      target: [schema.commentVotes.commentId, schema.commentVotes.userId],
      set: { vote },
    });
}
