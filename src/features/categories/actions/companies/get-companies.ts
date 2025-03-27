"use server";

import type { Company } from "@/database";
import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../../lib/companies/get-companies";

export async function getCompanies(): Promise<ActionResponse<Company[]>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return { success: false, error: "Forbidden." };
  }

  try {
    const data = await lib.getCompanies();
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get companies. Please try again later.",
    };
  }
}
