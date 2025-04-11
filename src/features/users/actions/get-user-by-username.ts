"use server";

import type { User } from "@/database";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-user-by-username";

export async function getUserByUsername(
  username: string,
): Promise<ActionResponse<User | null>> {
  try {
    const user = await lib.getUserByUsername(username);

    return {
      success: true,
      data: user,
    };
  } catch {
    return {
      success: false,
      error: "Failed to fetch the user. Please try again later.",
    };
  }
}
