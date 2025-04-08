"use server";

import { desc, eq, type SQL, sql } from "drizzle-orm";

import { schema } from "@/database";
import type { Question } from "@/features/questions";
import { getQuestions } from "@/features/questions/lib";
import type { ActionResponse } from "@/lib/action-response";

import { getUserQuestionsSchema } from "../schemas";
import type { GetUserQuestionsPayload } from "../types";

const COUNT_PER_PAGE = 10;

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
    const filters: SQL[] = [
      eq(schema.questions.isAnonymous, false),
      eq(schema.questions.status, "approved"),
      eq(schema.questions.userId, userId),
    ];

    const orderBy = ["relevance", "top"].includes(parsedPayload.data.orderBy)
      ? desc(sql`COALESCE(SUM(${schema.questionVotes.vote}), 0)`)
      : desc(schema.questions.createdAt);

    const { questions, count } = await getQuestions({
      offset: (parsedPayload.data.page - 1) * COUNT_PER_PAGE,
      limit: COUNT_PER_PAGE,
      filters,
      orderBy,
    });

    const pageCount = Math.ceil(count / COUNT_PER_PAGE);

    return {
      success: true,
      data: {
        questions,
        pageCount,
      },
    };
  } catch {
    return {
      success: false,
      error: "Failed to fetch questions. Please try again later.",
    };
  }
}
