"use server";

import { auth } from "@/features/auth";
import { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib";
import { reviewQuestionSchema } from "../schemas";
import { ReviewQuestionPayload } from "../types";

export async function reviewQuestion(
  id: string,
  payload: ReviewQuestionPayload,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (session?.user.role !== "admin" || !session.user.id) {
    return {
      success: false,
      error: "Forbidden.",
    };
  }

  const parsedPayload = await reviewQuestionSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      error: parsedPayload.error.message,
    };
  }

  try {
    await lib.reviewQuestion(id, session.user.id, payload);

    return {
      success: true,
      data: null,
    };
  } catch {
    return {
      success: false,
      error:
        "An error occurred while reviewing the question. Please try again later.",
    };
  }
}
