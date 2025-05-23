import { eq } from "drizzle-orm";

import { database, schema } from "@/database";
import { QuestionReviewedEmail } from "@/lib/emails/question-reviewed-email";
import { sendEmail } from "@/lib/resend";

import type { ReviewQuestionPayload } from "../types";

export async function reviewQuestion(
  questionId: string,
  userId: string,
  payload: ReviewQuestionPayload,
) {
  await database.transaction(async (tx) => {
    await tx.insert(schema.questionReviews).values({
      questionId,
      userId,
      ...payload,
    });

    await tx
      .update(schema.questions)
      .set({ status: payload.status })
      .where(eq(schema.questions.id, questionId));
  });

  if (!process.env.FROM_EMAIL) {
    throw new Error(
      "Status updated but no email sent because FROM_EMAIL is not set",
    );
  }

  const [{ to, username, questionTitle }] = await database
    .select({
      to: schema.users.email,
      username: schema.users.username,
      questionTitle: schema.questions.title,
    })
    .from(schema.questions)
    .innerJoin(schema.users, eq(schema.questions.userId, schema.users.id))
    .where(eq(schema.questions.id, questionId))
    .limit(1);

  if (to && username) {
    sendEmail({
      from: process.env.FROM_EMAIL,
      to,
      subject: "Your question has been reviewed",
      react: QuestionReviewedEmail({
        status: payload.status,
        questionUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/reviews/${questionId}`,
        username,
        questionTitle,
      }),
    });
  }
}
