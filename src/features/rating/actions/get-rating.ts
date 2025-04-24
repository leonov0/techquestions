"use server";

import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-rating";

export async function getRating(
  questionId: string,
): Promise<ActionResponse<number>> {
  try {
    const data = await lib.getRating(questionId);

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to question rating. Please try again later.",
    };
  }
}
