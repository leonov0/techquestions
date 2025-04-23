"use cache";

import {
  and,
  countDistinct,
  desc,
  eq,
  inArray,
  type SQL,
  sql,
} from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

import type { Question } from "../types";

export async function getQuestions({
  query,
  status,
  technologies,
  companies,
  seniorityLevels,
  page = 1,
  countPerPage = 10,
  isAnonymous,
  userId,
  order = "relevance",
}: {
  query?: string;
  status?: Question["status"];
  technologies?: string[];
  companies?: string[];
  seniorityLevels?: string[];
  page?: number;
  countPerPage?: number;
  isAnonymous?: boolean;
  userId?: string;
  order?: "new" | "top" | "relevance";
}) {
  cacheTag(
    "questions",
    "rating",
    "technologies",
    "companies",
    "seniority-levels",
  );

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

  if (seniorityLevels) {
    filters.push(
      inArray(
        schema.questionsToSeniorityLevels.seniorityLevelId,
        seniorityLevels,
      ),
    );
  }

  if (isAnonymous) {
    filters.push(eq(schema.questions.isAnonymous, isAnonymous));
  }

  if (userId) {
    filters.push(eq(schema.questions.userId, userId));
  }

  const orderBy = ["relevance", "top"].includes(order)
    ? desc(sql`COALESCE(SUM(${schema.questionVotes.vote}), 0)`)
    : desc(schema.questions.createdAt);

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
      schema.questionsToSeniorityLevels,
      eq(schema.questions.id, schema.questionsToSeniorityLevels.questionId),
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
      seniorityLevels: sql<[{ id: string; name: string }]>`COALESCE(
        json_agg(DISTINCT jsonb_build_object('id', ${schema.seniorityLevels.id},'name', ${schema.seniorityLevels.name})
        ) FILTER (WHERE ${schema.seniorityLevels.id} IS NOT NULL), '[]'::json)`,
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
      schema.questionsToSeniorityLevels,
      eq(schema.questions.id, schema.questionsToSeniorityLevels.questionId),
    )
    .leftJoin(
      schema.seniorityLevels,
      eq(
        schema.questionsToSeniorityLevels.seniorityLevelId,
        schema.seniorityLevels.id,
      ),
    )
    .where(inArray(schema.questions.id, questionIds))
    .groupBy(schema.questions.id, schema.users.id)
    .orderBy(orderBy)
    .limit(countPerPage)
    .offset(countPerPage * (page - 1));

  return { questions, pageCount } as {
    questions: Question[];
    pageCount: number;
  };
}
