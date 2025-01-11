"use server";

import { database, schema } from "@/database";
import { auth } from "@/features/auth";

import { submitQuestionSchema } from "./schemas";
import type { SubmitQuestionPayload } from "./types";

export async function submitQuestion(payload: SubmitQuestionPayload) {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "You must be logged in to submit a question." };
  }

  const parsedPayload = await submitQuestionSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return { error: "Invalid payload." };
  }

  const [{ questionId }] = await database
    .insert(schema.questions)
    .values({
      ...parsedPayload.data,
      userId: session.user.id,
    })
    .returning({ questionId: schema.questions.id });

  if (parsedPayload.data.technologies) {
    await database.insert(schema.questionsToTechnologies).values(
      parsedPayload.data.technologies.map((technologyId) => ({
        questionId,
        technologyId,
      })),
    );
  }

  return { error: null };
}
