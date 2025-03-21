"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib";

export async function getStatuses(): Promise<ActionResponse<string[]>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    const data = await lib.getStatuses();
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get question statuses. Please try again later.",
    };
  }
}
