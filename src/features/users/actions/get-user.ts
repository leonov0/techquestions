"use server";

import { headers } from "next/headers";

import type { User } from "@/database";
import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib/get-user";

export async function getUser(
  id: string,
): Promise<ActionResponse<User | null>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "You must be logged in to perform this action.",
    };
  }

  const { success } = await auth.api.userHasPermission({
    body: {
      userId: session.user.id,
      permissions: {
        user: ["list"],
      },
    },
  });

  if (!success) {
    return {
      success: false,
      error: "You do not have permission to perform this action.",
    };
  }

  try {
    const data = await lib.getUser(id);

    if (data === undefined) {
      return {
        success: true,
        data: null,
      };
    }

    return {
      success: true,
      data,
    };
  } catch {
    return {
      success: false,
      error: "An error occurred while fetching user. Please try again later.",
    };
  }
}
