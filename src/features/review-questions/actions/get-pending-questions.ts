"use server";

import { headers } from "next/headers";

import * as lib from "@/features/questions/lib/get-questions";
import type { Question } from "@/features/questions/types";
import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

export async function getPendingQuestions(): Promise<
  ActionResponse<{ questions: Question[]; pageCount: number }>
> {
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
        questions: ["list"],
      },
    },
  });

  if (!success) {
    return {
      success: false,
      error: "Forbidden.",
    };
  }

  try {
    const data = await lib.getQuestions({
      status: "pending",
    });
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get pending questions. Please try again later.",
    };
  }
}
