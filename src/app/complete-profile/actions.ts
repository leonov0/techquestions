"use server";

import { auth } from "@/features/auth";
import { updateUser } from "@/features/users/lib";
import type { UpdateUserPayload } from "@/features/users/types";

export async function completeProfile(
  data: UpdateUserPayload,
): Promise<{ success: true } | { success: false; message: string }> {
  const session = await auth();

  if (!session || !session.user.id) {
    return { success: false, message: "Not authorized" };
  }

  if (session.user.username === data.username) {
    return { success: true };
  }

  try {
    await updateUser(session.user.id, data);

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    }

    return { success: false, message: "An unknown error occurred" };
  }
}
