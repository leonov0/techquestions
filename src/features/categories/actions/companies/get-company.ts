"use server";

import { headers } from "next/headers";

import type { Company } from "@/database";
import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../../lib/companies/get-company";

export async function getCompany(
  id: string,
): Promise<ActionResponse<Company | null>> {
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
    const data = await lib.getCompany(id);
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get company. Please try again later.",
    };
  }
}
