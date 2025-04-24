"use server";

import { headers } from "next/headers";

import { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

import * as lib from "../lib";
import { Question } from "../types";

export async function getQuestion(
  id: string,
): Promise<ActionResponse<Question>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const data = await lib.getQuestion(id);

    if (data == null) {
      return { success: false, error: "Question not found." };
    }

    if (data.status !== "approved") {
      if (session && session.user.id !== data.author?.id) {
        const { success } = await auth.api.userHasPermission({
          body: {
            userId: session.user.id,
            permissions: { questions: ["list"] },
          },
        });

        if (success) {
          return { success: true, data };
        }
      }

      return { success: false, error: "Question not found." };
    }

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to get question. Please try again later.",
    };
  }
}
