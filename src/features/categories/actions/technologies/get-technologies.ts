"use server";

import { headers } from "next/headers";

import type { Technology } from "@/database";
import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../../lib/technologies/get-technologies";

export async function getTechnologies(): Promise<ActionResponse<Technology[]>> {
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
    const data = await lib.getTechnologies();
    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get technologies. Please try again later.",
    };
  }
}
