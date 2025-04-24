"use server";

import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-statuses";

export async function getStatuses(): Promise<ActionResponse<string[]>> {
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
