"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/vote";

export async function vote(
  questionId: string,
  vote: number,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (!session?.user.id) {
    return { success: false, error: "You need to be signed in to vote." };
  }

  try {
    lib.vote(questionId, session.user.id, vote);

    return { success: true, data: null };
  } catch {
    return { success: false, error: "Failed to vote. Please try again later." };
  }
}
