"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/companies/update-company";
import { updateCategorySchema } from "../../schemas";
import type { UpdateCategoryPayload } from "../../types";

export async function updateCompany(
  id: string,
  payload: UpdateCategoryPayload,
): Promise<ActionResponse<null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  const parsedPayload = await updateCategorySchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { success: false, error: "Invalid payload." };
  }

  try {
    await lib.updateCompany(id, parsedPayload.data);

    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to update company. Please try again later.",
    };
  }
}
