"use server";

import { auth, signOut } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/delete-user";

export async function deleteProfile(): Promise<ActionResponse<null>> {
  const session = await auth();

  if (!session?.user.id) {
    return {
      success: false,
      error: "You must be logged in to delete your profile.",
    };
  }

  try {
    await lib.deleteUser(session.user.id);
  } catch {
    return {
      success: false,
      error: "There was an error deleting your profile. Please try again.",
    };
  }

  await signOut({ redirectTo: "/" });

  return {
    success: true,
    data: null,
  };
}
