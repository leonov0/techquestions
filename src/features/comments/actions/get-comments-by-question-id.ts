"use server";

import { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-comments-by-question-id";
import type { Comment } from "../types";

export async function getCommentsByQuestionId(
  questionId: string,
): Promise<ActionResponse<Comment[]>> {
  try {
    const data = await lib.getCommentsByQuestionId(questionId);
    return { success: true, data };
  } catch (e) {
    console.error("Error fetching comments:", e);
    return {
      success: false,
      error: "Failed to fetch comments. Please try again later.",
    };
  }
}
