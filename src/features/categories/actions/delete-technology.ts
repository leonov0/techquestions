"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/delete-technology";

export async function deleteTechnology(
  id: string,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    await lib.deleteTechnology(id);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to delete technology. Please try again later.",
    };
  }
}
