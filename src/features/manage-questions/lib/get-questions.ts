"use cache";

import { and, desc, eq, SQL, sql } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

import type { Question } from "../types";

export async function getQuestions({
  filters = [],
  orderBy = desc(schema.questions.createdAt),
}: {
  filters?: SQL[];
  orderBy?: SQL;
}): Promise<Question[]> {
  cacheTag("questions");

  const questions = await database
    .select({
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
      author: schema.users,
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
      schema.questionsToSeniorityLevels,
      eq(schema.questions.id, schema.questionsToSeniorityLevels.questionId),
    )
    .leftJoin(
      schema.levels,
      eq(schema.questionsToSeniorityLevels.levelId, schema.levels.id),
    )
    .where(and(...filters))
    .orderBy(orderBy)
    .groupBy(schema.questions.id, schema.users.id);

  return questions;
}
