import { asc, desc, eq, SQL, sql } from "drizzle-orm";

import { schema } from "@/database";

import * as lib from "../lib";
import { getQuestionSchema } from "../schemas";
import type { GetQuestionPayload } from "../types";

const orderMappings = new Map<string, SQL>([
  ["date:asc", asc(schema.questions.updatedAt)],
  ["date:desc", desc(schema.questions.updatedAt)],
  ["rating:asc", asc(sql`COALESCE(SUM(${schema.questionVotes.vote}), 0)`)],
  ["rating:desc", desc(sql`COALESCE(SUM(${schema.questionVotes.vote}), 0)`)],
  ["title:asc", asc(schema.questions.title)],
  ["title:desc", desc(schema.questions.title)],
]);

export async function getQuestions(payload: GetQuestionPayload) {
  const result = await getQuestionSchema.safeParseAsync(payload);

  if (!result.success) {
    return {
      data: {
        questions: [],
        pageCount: 0,
      },
      error: result.error.message,
    };
  }

  const filters: SQL[] = [];

  if (result.data.technologyId) {
    filters.push(
      eq(schema.questionsToTechnologies.technologyId, result.data.technologyId),
    );
  }

  if (result.data.companyId) {
    filters.push(
      eq(schema.questionsToCompanies.companyId, result.data.companyId),
    );
  }

  if (result.data.levelId) {
    filters.push(eq(schema.questionsToLevels.levelId, result.data.levelId));
  }

  if (result.data.query) {
    filters.push(
      sql`(
      setweight(to_tsvector('english', ${schema.questions.title}), 'A') ||
      setweight(to_tsvector('english', ${schema.questions.body}), 'B'))
      @@ plainto_tsquery('english', ${result.data.query}
      )`,
    );
  }

  const limit = result.data.limit || 10;
  const offset = result.data.page ? (result.data.page - 1) * limit : 0;

  const orderBy = orderMappings.get(
    `${result.data.orderBy || "date"}:${result.data.order || "desc"}`,
  );

  try {
    const { questions, count } = await lib.getQuestions({
      filters,
      limit,
      offset,
      orderBy,
    });

    const pageCount = Math.ceil(count / limit);

    return {
      data: { questions, pageCount },
      error: null,
    };
  } catch {
    return {
      data: {
        questions: [],
        pageCount: 0,
      },
      error: "Failed to get questions",
    };
  }
}
