"use server";

import type { ActionResponse } from "@/lib/action-response";

import { getQuestions } from "../lib/get-questions";
import type { Question } from "../types";

export async function getFeaturedQuestions(): Promise<
  ActionResponse<Question[]>
> {
  try {
    const { questions: data } = await getQuestions({ countPerPage: 3 });

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get featured questions. Please try again later.",
    };
  }
}
