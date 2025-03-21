"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import { updateUser } from "../lib";
import type { UpdateUserPayload } from "../types";

export async function completeProfile(
  data: UpdateUserPayload,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (!session?.user.id) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await updateUser(session.user.id, data);

    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to update user. Please try again later.",
    };
  }
}
