"use server";

import type { Company } from "@/database";
import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/companies/get-company";

export async function getCompany(
  id: string,
): Promise<ActionResponse<Company | null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    const data = await lib.getCompany(id);
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get company. Please try again later.",
    };
  }
}
