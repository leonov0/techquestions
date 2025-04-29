"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "./lib";
import { updateQuestionSchema } from "./schemas";
import type { UpdateQuestionPayload } from "./types";

export async function updateQuestion(
  payload: UpdateQuestionPayload,
): Promise<ActionResponse<null>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to update a question.",
    };
  }

  const parsedPayload = await updateQuestionSchema.safeParseAsync(payload);

  if (parsedPayload.success === false) {
    return { success: false, error: "Invalid payload." };
  }

  const isQuestionPresent = await lib.isQuestionPresent(
    parsedPayload.data.id,
    session.user.id,
  );

  if (isQuestionPresent === false) {
    return {
      success: false,
      error: "You are not authorized to update this question.",
    };
  }

  try {
    await lib.updateQuestion(parsedPayload.data);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to update the question. Please try again later.",
    };
  }
}

export async function getDefaultValues(
  questionId: string,
): Promise<ActionResponse<UpdateQuestionPayload | null>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  try {
    const data = (await lib.getDefaultValues(
      questionId,
    )) as UpdateQuestionPayload | null;

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to fetch the question. Please try again later.",
    };
  }
}
