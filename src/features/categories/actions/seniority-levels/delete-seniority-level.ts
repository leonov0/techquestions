"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../../lib/seniority-levels/delete-seniority-level";

export async function deleteSeniorityLevel(
  id: string,
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
        questions: ["delete"],
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
    await lib.deleteSeniorityLevel(id);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to delete level. Please try again later.",
    };
  }
}
