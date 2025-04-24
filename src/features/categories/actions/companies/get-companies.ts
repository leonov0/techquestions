"use server";

import { headers } from "next/headers";

import type { Company } from "@/database";
import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../../lib/companies/get-companies";

export async function getCompanies(): Promise<ActionResponse<Company[]>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session === null) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const { success } = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        questions: ["list"],
      },
    },
  });

  if (!success) {
    return {
      success: false,
      error: "Forbidden.",
    };
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
