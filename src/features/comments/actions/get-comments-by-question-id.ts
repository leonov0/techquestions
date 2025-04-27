"use server";

import { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-comments-by-question-id";
import type { Comment } from "../types";

export async function getCommentsByQuestionId(
  questionId: string,
  order?: "new" | "top",
): Promise<ActionResponse<Comment[]>> {
  try {
    const data = await lib.getCommentsByQuestionId(questionId, order);
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to fetch comments. Please try again later.",
    };
  }
}
