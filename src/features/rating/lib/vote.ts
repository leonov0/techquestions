import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

export async function vote(questionId: string, userId: string, vote: number) {
  revalidateTag("rating");

  if (vote !== 1 && vote !== -1 && vote !== 0) {
    throw new Error("Invalid vote");
  }

  await database
    .insert(schema.questionVotes)
    .values({
      questionId,
      userId,
      vote,
    })
    .onConflictDoUpdate({
      target: [schema.questionVotes.questionId, schema.questionVotes.userId],
      set: { vote },
    });
}
