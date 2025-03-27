"use server";

import type { Technology } from "@/database";
import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/technologies/get-technologies";

export async function getTechnologies(): Promise<ActionResponse<Technology[]>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    const data = await lib.getTechnologies();
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get technologies. Please try again later.",
    };
  }
}
