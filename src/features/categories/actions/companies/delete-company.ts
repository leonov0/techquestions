"use server";

import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/companies/delete-company";

export async function deleteCompany(id: string): Promise<ActionResponse<null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    await lib.deleteCompany(id);
    return { success: true, data: null };
  } catch {
    return {
      success: false,
      error: "Failed to delete company. Please try again later.",
    };
  }
}
