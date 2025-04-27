"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib/vote";

export async function vote(
  commentId: string,
  vote: number,
): Promise<ActionResponse<null>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to vote.",
    };
  }

  if (vote !== 1 && vote !== -1 && vote !== 0) {
    return {
      success: false,
      error: "Invalid vote value.",
    };
  }

  try {
    await lib.vote(commentId, session.user.id, vote);

    return {
      success: true,
      data: null,
    };
  } catch {
    return {
      success: false,
      error:
        "An error occurred while processing your vote. Please try gain later.",
    };
  }
}
