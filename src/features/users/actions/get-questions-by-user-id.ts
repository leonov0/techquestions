"use server";

import type { Question } from "@/features/questions";
import { getQuestions } from "@/features/questions/lib/get-questions";
import type { ActionResponse } from "@/lib/action-response";

import { getUserQuestionsSchema } from "../schemas";
import type { GetUserQuestionsPayload } from "../types";

export async function getQuestionsByUserId(
  userId: string,
  payload: GetUserQuestionsPayload,
): Promise<
  ActionResponse<{
    questions: Question[];
    pageCount: number;
  }>
> {
  const parsedPayload = await getUserQuestionsSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      error: "Invalid payload.",
    };
  }

  try {
    const data = await getQuestions({
      ...parsedPayload.data,
      status: "approved",
      isAnonymous: false,
      userId,
    });

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to fetch questions. Please try again later.",
    };
  }
}
