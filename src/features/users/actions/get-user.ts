"use server";

import { z } from "zod";

import type { User } from "@/database";
import { auth } from "@/features/auth";
import * as lib from "@/features/users/lib/get-user";
import type { ActionResponse } from "@/lib/action-response";

const schema = z.object({
  id: z.string().uuid(),
});

export async function getUser(
  id: string,
): Promise<ActionResponse<User | null>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      success: false,
      error: "Forbidden.",
    };
  }

  const parsed = await schema.safeParseAsync({ id });

  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid user ID.",
    };
  }

  try {
    const user = await lib.getUser(id);

    return {
      success: true,
      data: user ?? null,
    };
  } catch {
    return {
      success: false,
      error:
        "An error occurred while fetching the user. Please try again later.",
    };
  }
}
