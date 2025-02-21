import { and, eq, sql, sum } from "drizzle-orm";

import { database, schema } from "@/database";

export async function getRating(questionId: string) {
  const [{ rating }] = await database
    .select({
      rating: sql<number>`COALESCE(${sum(schema.questionVotes.vote)}, 0)`,
    })
    .from(schema.questionVotes)
    .where(eq(schema.questionVotes.questionId, questionId));

  return rating;
}

export async function getRatingWithCurrentVote(
  questionId: string,
  userId: string,
) {
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

export async function addVote(
  questionId: string,
  userId: string,
  vote: number,
) {
  if (vote !== 1 && vote !== -1 && vote !== 0) {
    throw new Error("Invalid vote");
  }

  const question = await database
    .select()
    .from(schema.questions)
    .where(eq(schema.questions.id, questionId))
    .limit(1);

  if (question.length === 0) {
    throw new Error("Question not found");
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
