"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/levels/delete-level";

export async function deleteLevel(id: string): Promise<ActionResponse<null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    await lib.deleteLevel(id);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to delete level. Please try again later.",
    };
  }
}
