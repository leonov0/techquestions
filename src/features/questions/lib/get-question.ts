"use cache";

import { eq, sql } from "drizzle-orm";
import { unstable_cacheTag as cacheTag } from "next/cache";

import { database, schema } from "@/database";

import type { Question } from "../types";

export async function getQuestion(id: string): Promise<Question | null> {
  cacheTag("questions");

  const [question] = await database
    .select()
    .from(schema.questions)
    .where(eq(schema.questions.id, id))
    .limit(1);

  if (!question) {
    return null;
  }

  return {
    id: question.id,
    title: question.title,
    body: question.body,
    status: question.status,
    isAnonymous: question.isAnonymous,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
    author: await getAuthor(question.userId, question.isAnonymous),
    rating: await getRating(id),
    technologies: await getTechnologies(id),
    companies: await getCompanies(id),
    levels: await getLevels(id),
  } as Question;
}

async function getAuthor(id: string | null, isAnonymous: boolean) {
  cacheTag("users");

  if (isAnonymous || id === null) {
    return null;
  }

  const users = await database
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id))
    .limit(1);

  if (users.length === 0) {
    return null;
  }

  return users[0];
}

async function getTechnologies(id: string) {
  cacheTag("technologies");

  const technologies = await database
    .select({
      id: schema.technologies.id,
      name: schema.technologies.name,
    })
    .from(schema.questionsToTechnologies)
    .innerJoin(
      schema.technologies,
      eq(schema.technologies.id, schema.questionsToTechnologies.technologyId),
    )
    .where(eq(schema.questionsToTechnologies.technologyId, id));

  return technologies;
}

async function getCompanies(id: string) {
  cacheTag("companies");

  const companies = await database
    .select({
      id: schema.companies.id,
      name: schema.companies.name,
    })
    .from(schema.questionsToCompanies)
    .innerJoin(
      schema.companies,
      eq(schema.companies.id, schema.questionsToCompanies.companyId),
    )
    .where(eq(schema.questionsToCompanies.companyId, id));

  return companies;
}

async function getLevels(id: string) {
  cacheTag("levels");

  const levels = await database
    .select({
      id: schema.levels.id,
      name: schema.levels.name,
    })
    .from(schema.questionsToLevels)
    .innerJoin(
      schema.levels,
      eq(schema.levels.id, schema.questionsToLevels.levelId),
    )
    .where(eq(schema.questionsToLevels.levelId, id));

  return levels;
}

async function getRating(id: string) {
  cacheTag("rating");

  const [{ rating }] = await database
    .select({
      rating: sql<number>`COALESCE(SUM(${schema.questionVotes.vote}), 0)`,
    })
    .from(schema.questionVotes)
    .where(eq(schema.questionVotes.questionId, id))
    .limit(1);

  return rating;
}
