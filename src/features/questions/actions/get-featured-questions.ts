"use cache";

import { sql } from "drizzle-orm";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

import { schema } from "@/database";

import { getQuestions } from "../lib";

export async function getFeaturedQuestions({ limit }: { limit: number }) {
  cacheTag("questions");

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
