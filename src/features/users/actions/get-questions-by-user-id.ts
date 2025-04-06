"use server";

import { eq, type SQL } from "drizzle-orm";

import { schema } from "@/database";
import type { Question } from "@/features/questions";
import { getQuestions } from "@/features/questions/lib";
import type { ActionResponse } from "@/lib/action-response";

export async function getQuestionsByUserId(userId: string): Promise<
  ActionResponse<{
    questions: Question[];
    count: number;
  }>
> {
  try {
    const filters: SQL[] = [
      eq(schema.questions.isAnonymous, false),
      eq(schema.questions.status, "approved"),
      eq(schema.questions.userId, userId),
    ];

    const data = await getQuestions({ filters });

    return {
      success: true,
      data,
    };
  } catch {
    return {
      success: false,
      error: "Failed to fetch questions. Please try again later.",
    };
  }
}
