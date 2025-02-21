"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/features/auth";

import * as lib from "./lib";

export async function vote(questionId: string, vote: number) {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "You need to be signed in to vote." };
  }

  try {
    lib.addVote(questionId, session.user.id, vote);
    revalidatePath(`/questions/${questionId}`);
  } catch {
    return { error: "Failed to vote. Please try again later!" };
  }

  return { error: null };
}

export async function getRating(questionId: string) {
  const session = await auth();

  try {
    if (!session?.user.id) {
      const rating = await lib.getRating(questionId);

      return { data: { rating, currentVote: 0 }, error: null };
    }

    const data = await lib.getRatingWithCurrentVote(
      questionId,
      session.user.id,
    );

    return { data, error: null };
  } catch {
    return {
      data: { rating: 0, currentVote: 0 },
      error: "Failed to get your vote. Please try again later!",
    };
  }
}
