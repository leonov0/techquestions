import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";

import { database, schema } from "@/database";

import { ReviewQuestionPayload } from "../types";

export async function reviewQuestion(
  questionId: string,
  userId: string,
  payload: ReviewQuestionPayload,
) {
  await Promise.all([
    database.insert(schema.questionReviews).values({
      questionId,
      userId,
      ...payload,
    }),

    database
      .update(schema.questions)
      .set({ status: payload.status })
      .where(eq(schema.questions.id, questionId)),
  ]);

  revalidateTag("questions");
}
