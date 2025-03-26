import { inArray, type SQL } from "drizzle-orm";

import { schema } from "@/database";
import { auth } from "@/features/auth";
import type { ActionResponse } from "@/lib/action-response";

import * as lib from "../lib/get-questions";
import { getQuestionSchema } from "../schemas";
import type { GetQuestionPayload, Question } from "../types";

export async function getQuestions(
  payload: GetQuestionPayload,
): Promise<ActionResponse<Question[]>> {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      success: false,
      error: "Forbidden.",
    };
  }

  const parsedPayload = await getQuestionSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      error: "Invalid payload.",
    };
  }

  const filters: SQL[] = [];

  if (parsedPayload.data.status) {
    filters.push(inArray(schema.questions.status, parsedPayload.data.status));
  }

  const data = await lib.getQuestions({ filters });

  return { success: true, data };
}
