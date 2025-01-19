"use server";

import { eq, SQL, sql } from "drizzle-orm";

import { companies, levels, questions, technologies } from "@/database";

import * as lib from "./lib";
import { getQuestionSchema } from "./schemas";
import type { GetQuestionPayload } from "./types";

export async function getQuestions(payload: GetQuestionPayload) {
  const result = await getQuestionSchema.safeParseAsync(payload);

  if (!result.success) {
    return {
      data: {
        questions: [],
        count: 0,
      },
      error: result.error.message,
    };
  }

  const filters: SQL[] = [];

  if (result.data.technologyId) {
    filters.push(eq(technologies.id, result.data.technologyId));
  }

  if (result.data.companyId) {
    filters.push(eq(companies.id, result.data.companyId));
  }

  if (result.data.levelId) {
    filters.push(eq(levels.id, result.data.levelId));
  }

  if (result.data.query) {
    filters.push(
      sql`(
      setweight(to_tsvector('english', ${questions.title}), 'A') ||
      setweight(to_tsvector('english', ${questions.body}), 'B'))
      @@ plainto_tsquery('english', ${result.data.query}
      )`,
    );
  }

  const limit = payload.limit || 10;

  try {
    const [questions, count] = await Promise.all([
      lib.getQuestions({
        filters,
        limit,
        offset: payload.page ? (payload.page - 1) * limit : undefined,
      }),
      lib.getQuestionCount(filters),
    ]);

    return {
      data: { questions, count: Math.ceil(count / limit) },
      error: null,
    };
  } catch {
    return {
      data: {
        questions: [],
        count: 0,
      },
      error: "Failed to get questions",
    };
  }
}

export async function getCategories() {
  try {
    const data = await lib.getCategories();

    return { data, error: null };
  } catch {
    const data = { technologies: [], companies: [], levels: [] };

    return { data, error: "Failed to get categories" };
  }
}
