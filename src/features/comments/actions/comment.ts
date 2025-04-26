"use server";

import { headers } from "next/headers";

import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib/create-comment";
import { commentSchema } from "../schemas";
import type { CommentPayload } from "../types";

export async function comment(
  payload: CommentPayload,
): Promise<ActionResponse<null>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  const parsedPayload = await commentSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      error: "Invalid payload.",
    };
  }

  try {
    await lib.createComment({
      userId: session.user.id,
      ...parsedPayload.data,
    });

    return {
      success: true,
      data: null,
    };
  } catch {
    return {
      success: false,
      error: "Failed to create comment. Please try again later.",
    };
  }
}
