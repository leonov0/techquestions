"use server";

import type { Technology } from "@/database";
import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-technology";

export async function getTechnology(
  id: string,
): Promise<ActionResponse<Technology | null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    const technology = await lib.getTechnology(id);

    return { success: true, data: technology };
  } catch {
    return {
      success: false,
      error: "Failed to get technology. Please try again later.",
    };
  }
}
