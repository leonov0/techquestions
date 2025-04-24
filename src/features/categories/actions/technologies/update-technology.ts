"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../../lib/technologies/update-technology";
import { updateCategorySchema } from "../../schemas";
import type { UpdateCategoryPayload } from "../../types";

export async function updateTechnology(
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

  const parsedPayload = await updateCategorySchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { success: false, error: "Invalid payload." };
  }

  try {
    await lib.updateTechnology(id, parsedPayload.data);

    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to update technology. Please try again later.",
    };
  }
}
