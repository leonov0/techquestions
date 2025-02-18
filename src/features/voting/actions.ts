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

  try {
    const question = await database
      .select()
      .from(schema.questions)
      .where(eq(schema.questions.id, questionId))
      .limit(1);

    if (question.length === 0) {
      return { error: "Question not found" };
    }
  } catch {
    return { error: "Failed to vote. Please try again later!" };
  }

  try {
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
  } catch {
    return { error: "Failed to vote. Please try again later!" };
  }

  return { error: null };
}

export async function getVote(questionId: string) {
  const session = await auth();

  if (!session?.user.id) {
    return { data: 0, error: null };
  }

  try {
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

    return { data: vote[0]?.vote ?? 0, error: null };
  } catch {
    return {
      data: 0,
      error: "Failed to fet your vote. Please try again later!",
    };
  }
}
