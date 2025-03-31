"use server";

import { auth } from "@/features/auth";
import * as lib from "@/features/questions/lib/get-questions";
import type { Question } from "@/features/questions/types";
import type { ActionResponse } from "@/lib/action-response";

export async function getPendingQuestions(): Promise<
  ActionResponse<{ questions: Question[]; pageCount: number }>
> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      success: false,
      error: "Forbidden.",
    };
  }

  try {
    const data = await lib.getQuestions({
      status: "pending",
    });
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get pending questions. Please try again later.",
    };
  }
}
