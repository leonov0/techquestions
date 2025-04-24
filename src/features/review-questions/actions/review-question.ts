"use server";

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

import { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib/review-question";
import { reviewQuestionSchema } from "../schemas";
import { ReviewQuestionPayload } from "../types";

export async function reviewQuestion(
  id: string,
  payload: ReviewQuestionPayload,
): Promise<ActionResponse<null>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === null) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const { success } = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      permissions: {
        questions: ["create"],
      },
    },
  });

  if (!success) {
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
    revalidateTag("questions");

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
