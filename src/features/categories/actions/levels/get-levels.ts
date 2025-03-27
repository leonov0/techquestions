"use server";

import type { Level } from "@/database";
import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/levels/get-levels";

export async function getLevels(): Promise<ActionResponse<Level[]>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    const data = await lib.getLevels();
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get levels. Please try again later.",
    };
  }
}
