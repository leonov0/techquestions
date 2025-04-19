"use server";

import type { User } from "@/database";
import { auth } from "@/features/auth";
import { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-users";

export async function getUsers(): Promise<ActionResponse<User[]>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      success: false,
      error: "Forbidden.",
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
      error: "Failed to fetch users. Please try again.",
    };
  }
}
