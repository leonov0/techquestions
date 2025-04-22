"use server";

import { getQuestions, type Question } from "@/features/questions";
import type { ActionResponse } from "@/lib/action-response";

export async function getFeaturedQuestions(): Promise<
  ActionResponse<Question[]>
> {
  try {
    const { questions } = await getQuestions({
      countPerPage: 3,
      status: "approved",
    });

    return { success: true, data: questions };
  } catch {
    return {
      success: false,
      error: "Failed to get featured questions. Please try again later.",
    };
  }
}
