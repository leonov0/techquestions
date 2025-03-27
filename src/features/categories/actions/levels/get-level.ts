"use server";

import type { Level } from "@/database";
import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/levels/get-level";

export async function getLevel(
  id: string,
): Promise<ActionResponse<Level | null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    const data = await lib.getLevel(id);
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get level. Please try again later.",
    };
  }
}
