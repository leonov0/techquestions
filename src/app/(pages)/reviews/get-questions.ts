"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { database, type Question, schema } from "@/database";
import type { ActionResponse } from "@/lib/action-response";
import { auth } from "@/lib/auth";

export async function getQuestions(): Promise<ActionResponse<Question[]>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      error: "Unauthorized.",
    };
  }

  try {
    const data = await database
      .select()
      .from(schema.questions)
      .where(eq(schema.questions.userId, session.user.id));

    return {
      success: true,
      data,
    };
  } catch {
    return {
      success: false,
      error: "Failed to fetch pending reviews.",
    };
  }
}
