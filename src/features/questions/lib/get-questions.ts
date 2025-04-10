"use cache";

import { and, asc, countDistinct, eq, inArray, SQL, sql } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

import type { Question } from "../types";

export async function getQuestions({
  query,
  status,
  technologies,
  companies,
  levels,
  page = 1,
  countPerPage = 10,
}: {
  query?: string;
  status?: Question["status"];
  technologies?: string[];
  companies?: string[];
  levels?: string[];
  page?: number;
  countPerPage?: number;
}) {
  cacheTag("questions", "rating", "technologies", "companies", "levels");

  const filters: SQL[] = [];

  if (status) {
    filters.push(eq(schema.questions.status, status));
  }

  if (query) {
    filters.push(
      sql`(
        setweight(to_tsvector('english', ${schema.questions.title}), 'A') ||
        setweight(to_tsvector('english', ${schema.questions.body}), 'B'))
        @@ plainto_tsquery('english', ${query}
      )`,
    );
  }

  if (technologies) {
    filters.push(
      inArray(schema.questionsToTechnologies.technologyId, technologies),
    );
  }

  if (companies) {
    filters.push(inArray(schema.questionsToCompanies.companyId, companies));
  }

  if (levels) {
    filters.push(inArray(schema.questionsToLevels.levelId, levels));
  }

  const [{ questionIds, pageCount }] = await database
    .select({
      questionIds: sql<
        string[]
      >`COALESCE(json_agg(DISTINCT ${schema.questions.id}), '[]'::json)`,
      pageCount: sql<number>`CEIL(COUNT(DISTINCT ${schema.questions.id})::FLOAT / ${countPerPage})`,
    })
    .from(schema.questions)
    .leftJoin(
      schema.questionVotes,
      eq(schema.questions.id, schema.questionVotes.questionId),
    )
    .leftJoin(schema.users, eq(schema.questions.userId, schema.users.id))
    .leftJoin(
      schema.questionsToTechnologies,
      eq(schema.questions.id, schema.questionsToTechnologies.questionId),
    )
    .leftJoin(
      schema.questionsToCompanies,
      eq(schema.questions.id, schema.questionsToCompanies.questionId),
    )
    .leftJoin(
      schema.questionsToLevels,
      eq(schema.questions.id, schema.questionsToLevels.questionId),
    )
    .where(and(...filters));

  const questions = await database
    .select({
      count: countDistinct(schema.questions.id),
      id: schema.questions.id,
      title: schema.questions.title,
      body: schema.questions.body,
      isAnonymous: schema.questions.isAnonymous,
      status: schema.questions.status,
      createdAt: schema.questions.createdAt,
      updatedAt: schema.questions.updatedAt,
      rating: sql<number>`COALESCE(SUM(${schema.questionVotes.vote}), 0)`,
      technologies: sql<[{ id: string; name: string }]>`COALESCE(
        json_agg(
          DISTINCT jsonb_build_object('id', ${schema.technologies.id}, 'name', ${schema.technologies.name})
        ) FILTER (WHERE ${schema.technologies.id} IS NOT NULL), '[]'::json)`,
      companies: sql<[{ id: string; name: string }]>`COALESCE(
        json_agg(
          DISTINCT jsonb_build_object('id', ${schema.companies.id},'name', ${schema.companies.name})
        ) FILTER (WHERE ${schema.companies.id} IS NOT NULL), '[]'::json)`,
      levels: sql<[{ id: string; name: string }]>`COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', ${schema.levels.id},'name', ${schema.levels.name})
        ) FILTER (WHERE ${schema.levels.id} IS NOT NULL), '[]'::json)`,
      author: sql<{
        id: string;
        username: string;
        image: string | null;
      } | null>`CASE WHEN ${schema.questions.isAnonymous} OR ${schema.users.username} IS NULL THEN NULL ELSE
        jsonb_build_object('id', ${schema.users.id}, 'username', ${schema.users.username}, 'image', ${schema.users.image}) END`,
    })
    .from(schema.questions)
    .leftJoin(
      schema.questionVotes,
      eq(schema.questions.id, schema.questionVotes.questionId),
    )
    .leftJoin(schema.users, eq(schema.questions.userId, schema.users.id))
    .leftJoin(
      schema.questionsToTechnologies,
      eq(schema.questions.id, schema.questionsToTechnologies.questionId),
    )
    .leftJoin(
      schema.technologies,
      eq(schema.questionsToTechnologies.technologyId, schema.technologies.id),
    )
    .leftJoin(
      schema.questionsToCompanies,
      eq(schema.questions.id, schema.questionsToCompanies.questionId),
    )
    .leftJoin(
      schema.companies,
      eq(schema.questionsToCompanies.companyId, schema.companies.id),
    )
    .leftJoin(
      schema.questionsToLevels,
      eq(schema.questions.id, schema.questionsToLevels.questionId),
    )
    .leftJoin(
      schema.levels,
      eq(schema.questionsToLevels.levelId, schema.levels.id),
    )
    .where(inArray(schema.questions.id, questionIds))
    .groupBy(schema.questions.id, schema.users.id)
    .orderBy(asc(schema.questions.createdAt))
    .limit(countPerPage)
    .offset(countPerPage * (page - 1));

  return { questions, pageCount } as {
    questions: Question[];
    pageCount: number;
  };
}
