"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-rating";
import { getRatingWithCurrentVote } from "../lib/get-rating-with-current-vote";

export async function getRating(
  questionId: string,
): Promise<ActionResponse<{ rating: number; currentVote: number }>> {
  const session = await auth();

  try {
    if (!session?.user.id) {
      const rating = await lib.getRating(questionId);

      return { success: true, data: { rating, currentVote: 0 } };
    }

    const data = await getRatingWithCurrentVote(questionId, session.user.id);

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get your vote. Please try again later.",
    };
  }
}
