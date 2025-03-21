"use server";

import { eq, SQL } from "drizzle-orm";

import { schema } from "@/database";
import * as lib from "@/features/questions/lib";
import type { Question } from "@/features/questions/types";
import type { ActionResponse } from "@/lib/action-response";

export async function getQuestions({
  status,
}: {
  status?: string;
}): Promise<ActionResponse<{ questions: Question[]; count: number }>> {
  const filters: SQL[] = [];

  if (status) {
    filters.push(eq(schema.questions.status, status as Question["status"]));
  }

  try {
    const data = await lib.getQuestions({ filters });

    return {
      success: true,
      data,
    };
  } catch {
    return {
      success: false,
      error: "Failed to get questions. Please try again later.",
    };
  }
}
