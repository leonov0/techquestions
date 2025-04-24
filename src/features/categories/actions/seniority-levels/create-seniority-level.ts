"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../../lib/seniority-levels/create-seniority-level";
import { createCategorySchema } from "../../schemas";
import type { CreateCategoryPayload } from "../../types";

export async function createSeniorityLevel(
  payload: CreateCategoryPayload,
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
      userId: session.user.id,
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

  const parsedPayload = await createCategorySchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { success: false, error: "Invalid payload." };
  }

  try {
    await lib.createSeniorityLevel(parsedPayload.data);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to create level. Please try again later.",
    };
  }
}
