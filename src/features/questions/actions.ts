"use server";

import { eq, SQL, sql } from "drizzle-orm";

import {
  companies,
  levels,
  questions,
  technologies,
} from "@/features/database";

import * as lib from "./lib";
import { getQuestionSchema } from "./schemas";
import type { GetQuestionPayload } from "./types";

export async function getQuestions(payload: GetQuestionPayload) {
  const result = await getQuestionSchema.safeParseAsync(payload);

  if (!result.success) {
    return { data: [], error: result.error };
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

  return { data: await lib.getQuestions(filters), error: null };
}

export async function getCategories() {
  return lib.getCategories();
}
