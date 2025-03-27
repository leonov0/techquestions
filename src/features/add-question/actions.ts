"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "./lib";
import { submitQuestionSchema } from "./schemas";
import type { SubmitQuestionPayload } from "./types";

export async function submitQuestion(
  payload: SubmitQuestionPayload,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (!session?.user.id) {
    return {
      success: false,
      error: "You must be logged in to submit a question.",
    };
  }

  const parsedPayload = await submitQuestionSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { success: false, error: "Invalid payload." };
  }

  const { technologies, companies, levels, ...value } = parsedPayload.data;

  try {
    await lib.createQuestion({
      value: {
        ...value,
        userId: session.user.id,
      },
      technologies,
      companies,
      levels,
    });
  } catch {
    return {
      success: false,
      error: "Failed to submit question. Please try again later.",
    };
  }

  return { success: true, data: null };
}
