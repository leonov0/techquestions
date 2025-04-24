"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib/get-pending-question-count";

export async function getPendingQuestionCount(): Promise<
  ActionResponse<number>
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
    const data = await lib.getPendingQuestionCount();
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get pending question count. Please ty again later.",
    };
  }
}
