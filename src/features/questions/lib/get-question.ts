import { eq } from "drizzle-orm";

import { schema } from "@/database";

import type { Question } from "../types";
import { getQuestions } from "./get-questions";

export async function getQuestion(id: string) {
  const filters = [eq(schema.questions.id, id)];

  const { questions } = await getQuestions({ filters, limit: 1 });

  if (questions.length === 0) {
    return null;
  }

  return questions.at(0) as Question | null;
}
