"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib/vote";

export async function vote(
  questionId: string,
  vote: number,
): Promise<ActionResponse<null>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: false, error: "You need to be signed in to vote." };
  }

  try {
    await lib.vote(questionId, session.user.id, vote);

    return { success: true, data: null };
  } catch {
    return { success: false, error: "Failed to vote. Please try again later." };
  }
}
