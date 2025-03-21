"use server";

import { revalidateTag } from "next/cache";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "./lib";

export async function vote(
  questionId: string,
  vote: number,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (!session?.user.id) {
    return { success: false, error: "You need to be signed in to vote." };
  }

  try {
    lib.addVote(questionId, session.user.id, vote);

    revalidateTag("questions");

    return { success: true, data: null };
  } catch {
    return { success: false, error: "Failed to vote. Please try again later." };
  }
}

export async function getRating(
  questionId: string,
): Promise<ActionResponse<{ rating: number; currentVote: number }>> {
  const session = await auth();

  try {
    if (!session?.user.id) {
      const rating = await lib.getRating(questionId);

      return { success: true, data: { rating, currentVote: 0 } };
    }

    const data = await lib.getRatingWithCurrentVote(
      questionId,
      session.user.id,
    );

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get your vote. Please try again later.",
    };
  }
}
