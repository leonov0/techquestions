"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../../lib/seniority-levels/update-seniority-level";
import { updateCategorySchema } from "../../schemas";
import type { UpdateCategoryPayload } from "../../types";

export async function updateSeniorityLevel(
  id: string,
  payload: UpdateCategoryPayload,
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
        questions: ["update"],
      },
    },
  });

  if (!success) {
    return {
      success: false,
      error: "Forbidden.",
    };
  }

  const parsedPayload = await updateCategorySchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { success: false, error: "Invalid payload." };
  }

  try {
    await lib.updateSeniorityLevel(id, parsedPayload.data);

    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to update level. Please try again later.",
    };
  }
}
