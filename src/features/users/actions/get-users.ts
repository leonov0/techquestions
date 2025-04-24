"use server";

import { headers } from "next/headers";

import type { User } from "@/database";
import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib/get-users";

export async function getUsers(): Promise<ActionResponse<User[]>> {
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
    const data = await lib.getUsers();

    return {
      success: true,
      data,
    };
  } catch {
    return {
      success: false,
      error: "An error occurred while fetching users. Please try again later.",
    };
  }
}
