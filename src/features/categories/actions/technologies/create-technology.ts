"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/technologies/create-technology";
import { createCategorySchema } from "../../schemas";
import type { CreateCategoryPayload } from "../../types";

export async function createTechnology(
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
    await lib.createTechnology(parsedPayload.data);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to create technology. Please try again later.",
    };
  }
}
