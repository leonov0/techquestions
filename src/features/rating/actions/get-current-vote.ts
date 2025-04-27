"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib/get-current-vote";

export async function getCurrentVote(
  questionId: string,
): Promise<ActionResponse<number>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { success: true, data: 0 };
  }

  try {
    const data = await lib.getCurrentVote(questionId, session.user.id);

    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to get current vote." };
  }
}
