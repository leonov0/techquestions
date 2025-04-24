"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "./lib";
import { submitQuestionSchema } from "./schemas";
import type { SubmitQuestionPayload } from "./types";

export async function submitQuestion(
  payload: SubmitQuestionPayload,
): Promise<ActionResponse<null>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to submit a question.",
    };
  }

  const parsedPayload = await submitQuestionSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { success: false, error: "Invalid payload." };
  }

  const { technologies, companies, seniorityLevels, ...value } =
    parsedPayload.data;

  try {
    await lib.createQuestion({
      value: {
        ...value,
        userId: session.user.id,
      },
      technologies,
      companies,
      seniorityLevels,
    });
  } catch {
    return {
      success: false,
      error: "Failed to submit question. Please try again later.",
    };
  }

  return { success: true, data: null };
}
