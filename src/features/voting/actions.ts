"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { database, schema } from "@/database";
import { auth } from "@/features/auth";

export async function vote(questionId: string, vote: number) {
  const session = await auth();

  if (!session?.user.id) {
    redirect(
      "/signin?callbackUrl=" + encodeURIComponent(`/questions/${questionId}`),
    );
  }

  if (vote !== 1 && vote !== -1 && vote !== 0) {
    return { error: "Invalid vote" };
  }

  const question = await database
    .select()
    .from(schema.questions)
    .where(eq(schema.questions.id, questionId))
    .limit(1);

  if (question.length === 0) {
    return { error: "Question not found" };
  }

  await database
    .insert(schema.questionVotes)
    .values({
      questionId,
      userId: session.user.id,
      vote,
    })
    .onConflictDoUpdate({
      target: [schema.questionVotes.questionId, schema.questionVotes.userId],
      set: { vote },
    });

  revalidatePath(`/questions/${questionId}`);

  return { error: null };
}

export async function getVote(questionId: string) {
  const session = await auth();

  if (!session?.user.id) {
    return 0;
  }

  const vote = await database
    .select()
    .from(schema.questionVotes)
    .where(
      and(
        eq(schema.questionVotes.questionId, questionId),
        eq(schema.questionVotes.userId, session.user.id),
      ),
    )
    .limit(1);

  return vote[0]?.vote ?? 0;
}
