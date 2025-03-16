"use cache";

import { asc, desc, inArray, SQL, sql } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

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
  cacheTag("questions");

  const parsedPayload = await getQuestionSchema.safeParseAsync(payload);

  if (!parsedPayload.success) {
    return {
      data: {
        questions: [],
        pageCount: 0,
      },
      error: parsedPayload.error.message,
    };
  }

  const filters: SQL[] = [];

  if (parsedPayload.data.technologies) {
    filters.push(
      inArray(
        schema.questionsToTechnologies.technologyId,
        parsedPayload.data.technologies,
      ),
    );
  }

  if (parsedPayload.data.companies) {
    filters.push(
      inArray(
        schema.questionsToCompanies.companyId,
        parsedPayload.data.companies,
      ),
    );
  }

  if (parsedPayload.data.levels) {
    filters.push(
      inArray(schema.questionsToLevels.levelId, parsedPayload.data.levels),
    );
  }

  if (parsedPayload.data.query) {
    filters.push(
      sql`(
      setweight(to_tsvector('english', ${schema.questions.title}), 'A') ||
      setweight(to_tsvector('english', ${schema.questions.body}), 'B'))
      @@ plainto_tsquery('english', ${parsedPayload.data.query}
      )`,
    );
  }

  const limit = parsedPayload.data.limit || 10;
  const offset = parsedPayload.data.page
    ? (parsedPayload.data.page - 1) * limit
    : 0;

  const orderBy = orderMappings.get(
    `${parsedPayload.data.orderBy || "date"}:${parsedPayload.data.order || "desc"}`,
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
