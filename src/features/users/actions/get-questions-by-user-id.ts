"use server";

import { desc, sql } from "drizzle-orm";

import { schema } from "@/database";
import type { Question } from "@/features/questions";
import { getQuestions } from "@/features/questions/lib/get-questions";
import type { ActionResponse } from "@/lib/action-response";

import { getUserQuestionsSchema } from "../schemas";
import type { GetUserQuestionsPayload } from "../types";

export async function getQuestionsByUserId(
  userId: string,
  payload: GetUserQuestionsPayload,
): Promise<
  ActionResponse<{
    questions: Question[];
    pageCount: number;
  }>
> {
  const parsedPayload = await getUserQuestionsSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      error: "Invalid payload.",
    };
  }

  try {
    const orderBy = ["relevance", "top"].includes(parsedPayload.data.orderBy)
      ? desc(sql`COALESCE(SUM(${schema.questionVotes.vote}), 0)`)
      : desc(schema.questions.createdAt);

    const data = await getQuestions({
      page: parsedPayload.data.page,
      status: "approved",
      isAnonymous: false,
      userId,
    });

    return { success: true, data };
  } catch {
    return {
      success: false,
      error: "Failed to fetch questions. Please try again later.",
    };
  }
}
