"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/update-user";
import { updateUserSchema } from "../schemas";
import type { UpdateUserPayload } from "../types";

export async function updateProfile(
  payload: UpdateUserPayload,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (!session?.user.id) {
    return { success: false, error: "Unauthorized." };
  }

  const parsedPayload = await updateUserSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { success: false, error: "Invalid payload." };
  }

  if (parsedPayload.data.role && session.user.role !== "admin") {
    return {
      success: false,
      error: "You are not allowed to change your role.",
    };
  }

  try {
    await lib.updateUser(session.user.id, payload);

    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to update user. Please try again later.",
    };
  }
}
