"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-pending-question-count";

export async function getPendingQuestionCount(): Promise<
  ActionResponse<number>
> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      success: false,
      error: "Forbidden.",
    };
  }

  try {
    const data = await lib.getPendingQuestionCount();
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get pending question count. Please ty again later.",
    };
  }
}
