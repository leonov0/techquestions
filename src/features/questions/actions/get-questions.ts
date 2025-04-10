"use server";

import { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-questions";
import { getQuestionSchema } from "../schemas";
import type { GetQuestionPayload, Question } from "../types";

export async function getQuestions(
  payload: GetQuestionPayload,
): Promise<ActionResponse<{ questions: Question[]; pageCount: number }>> {
  const parsedPayload = await getQuestionSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      error: parsedPayload.error.message,
    };
  }

  try {
    const data = await lib.getQuestions({
      query: parsedPayload.data.query,
      status: "pending",
    });

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get questions. Please try again later.",
    };
  }
}
