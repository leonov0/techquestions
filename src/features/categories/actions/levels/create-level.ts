"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/levels/create-level";
import { createCategorySchema } from "../../schemas";
import type { CreateCategoryPayload } from "../../types";

export async function createLevel(
  payload: CreateCategoryPayload,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  const parsedPayload = await createCategorySchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { success: false, error: "Invalid payload." };
  }

  try {
    await lib.createLevel(parsedPayload.data);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to create level. Please try again later.",
    };
  }
}
