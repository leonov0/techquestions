import { sql } from "drizzle-orm";

import { schema } from "@/database";

import { getQuestions } from "../lib";

export async function getFeaturedQuestions({ limit }: { limit: number }) {
  const orderBy = sql<number>`COALESCE(SUM(${schema.questionVotes.vote}), 0) DESC`;

  try {
    const { questions, count } = await getQuestions({ orderBy, limit });

    if (count === 0) {
      return { data: [], error: "No featured questions found" };
    }

    return { data: questions, error: null };
  } catch {
    return { data: [], error: "Failed to get featured questions" };
  }
}
