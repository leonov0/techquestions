import { asc } from "drizzle-orm";

import { schema } from "@/database";
import { getQuestions } from "@/features/questions/lib";

export async function getFeaturedQuestions() {
  // TODO: Implement featured questions

  const orderBy = asc(schema.questions.createdAt);

  try {
    const data = await getQuestions({ orderBy, limit: 3 });

    if (data.length === 0) {
      return { data: [], error: "No featured questions found" };
    }

    return { data, error: null };
  } catch {
    return { data: [], error: "Failed to get featured questions" };
  }
}
